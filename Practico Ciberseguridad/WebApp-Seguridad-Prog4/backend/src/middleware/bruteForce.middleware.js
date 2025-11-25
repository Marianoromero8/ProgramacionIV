// src/middleware/bruteforce.middleware.js

const NodeCache = require('node-cache'); //registrar y controlar los intentos de login por IP
const loginAttempts = new NodeCache({ stdTTL: 900, checkperiod: 120 });
// stdTTL: 900 => tiempo que dura cada clave en segundos antes de expirar: 900 seg o 15 min
// checkperiod: 120 => intervalo de tiempo en seg, en el que NodeCache revisa si hay claves vencidas

//pausar la ejecución de forma asíncrona durante un tiempo determinado en milisegundos.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Rate limit

const loginRateLimiter = (req, res, next) => { // Cuenta todos los intentos, se ejecuta antes de llamar al login
  const ip = req.ip; //agarramos la ip
  const key = `rate_${ip}`; // creamos una clave unica para esa ip
  const count = (loginAttempts.get(key) || 0) + 1; // intentos actuales o 0 si es undefined

  if (count > 5) {
    return res.status(429).json({ error: 'Too many requests' }); // mas de 5 intentos devulve error con el codigo 429
  }

  loginAttempts.set(key, count, 900); // guardamos el contador actualizado en node cache, 900 seg dura
  next();
};

// 2. Delay progresivo

const bruteForceProtection = async (req, res, next) => {
  const ip = req.ip;
  const attempts = loginAttempts.get(`failed_${ip}`) || 0; // obtener la cantidad de intentos de node cache, sino hay attempts= 0
  const delay = Math.min(500 * Math.pow(2, attempts), 1000); //delay exponencial, pero con limite de 1000 ms

  await sleep(delay); // Espera ese tiempo antes de pasar al siguiente middleware
  next();
};

//3. CAPTCHA

const captchaM = (req, res, next) => { 
  const ip = req.ip;
  const attempts = loginAttempts.get(`failed_${ip}`) || 0; // obtenemos los intentos fallidos de la ip de node cache

  if (attempts >= 3) {      // a partir del intento 3
    if (!req.body.captcha) {
      return res.status(400).json({ error: 'captcha required' }); //Si no enviamos el CAPTCHA, devuelve 400 con mensaje de error.
    }
    if (req.body.captcha !== 'VALID') {
      return res.status(400).json({ error: 'invalid captcha' }); // Si el CAPTCHA es incorrecto, devuelve 400 con mensaje de error.
    }
    loginAttempts.del(`failed_${ip}`); // Si el CAPTCHA es correcto, resetea los intentos fallidos de esa IP.
  }

  next();
};

//4. Registrar fallos (ÚNICO lugar seguro para logs)

const trackFailedLogin = (req, res, next) => {  // // Marca cuántos intentos fallidos tiene esa IP. Pasa la info a los otros metodos
  const ip = req.ip;
  const key = `failed_${ip}`; // identifica ip y crea clave unica

  const originalJson = res.json.bind(res); // Guarda la función original res.json para poder llamarla después de modificarla.

  res.json = function (data) {      // Intercepta la respuesta del login.
    if (res.statusCode === 401 || (data && data.error === 'Credenciales inválidas')) {
      const current = loginAttempts.get(key) || 0;
      loginAttempts.set(key, current + 1, 900); // si las credenciales son invalidas, aumentaos contador de intentos fallidos del cache

      //  Logs mínimos y seguros
      console.log(`Fallos del IP ${ip}: intento , ${current + 1}`);
    }
    return originalJson(data); 
  };

  next();
};

module.exports = {
  loginRateLimiter,
  bruteForceProtection,
  captchaM,
  trackFailedLogin
};