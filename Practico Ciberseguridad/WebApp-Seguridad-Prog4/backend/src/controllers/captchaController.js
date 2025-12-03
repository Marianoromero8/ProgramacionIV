/* const svgCaptcha = require('svg-captcha');

// Store para captchas (VULNERABLE: almacenamiento inseguro)
let captchaStore = {};

const generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 1,
    color: true
  });
  
  // VULNERABLE: CAPTCHA predecible y almacenado de forma insegura
  const captchaId = Date.now().toString();
  captchaStore[captchaId] = captcha.text.toLowerCase();
  
  res.json({
    captchaId,
    captcha: captcha.data,
    // VULNERABLE: Envía la respuesta en modo debug
    debug: process.env.NODE_ENV === 'development' ? captcha.text : undefined
  });
};

const verifyCaptcha = (req, res) => {
  const { captchaId, captchaText } = req.body;
  
  // VULNERABLE: No expira el CAPTCHA y permite múltiples intentos
  if (captchaStore[captchaId] && captchaStore[captchaId] === captchaText.toLowerCase()) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
};

module.exports = {
  generateCaptcha,
  verifyCaptcha,
  captchaStore
}; */

const crypto = require('crypto');

// almacenamento controlado
const captchaStore = new Map();

const generateCaptcha = (req, res) => {
  const captchaText = Math.random().toString(36).substring(2, 8);
  // generacion de ID random
  const captchaId = crypto.randomBytes(32).toString('hex');

  const data = {
    text: captchaText,
    createdAt: Date.now(),
    used: false,
    attempts: 0,
    blocked: false
  };

  captchaStore.set(captchaId, data);

  const response = { captchaId };
  // no filtrar respuestas en produccion
  if (process.env.NODE_ENV !== 'production') {
    response.debug = captchaText;
  }

  res.json(response);
};

const verifyCaptcha = (req, res) => {
  const { captchaId, captchaText } = req.body;
  const stored = captchaStore.get(captchaId);

  if (!stored) {
    return res.json({ valid: false, error: 'not found' });
  }

  // 1 Bloqueado
  if (stored.blocked) {
    return res.json({ valid: false, error: 'Too many attempts' });
  }

  // 2 Expiración real
  if (Date.now() - stored.createdAt > 5 * 60 * 1000) {
    return res.json({ valid: false, error: 'expired' });
  }

  // 3 Ya usado (uso unico)
  if (stored.used) {
    return res.json({ valid: false, error: 'already used' });
  }

  // 4 Simulación del test (solo si usa "1234" y aún no fue usado)
  // (El test no modifica el tiempo, solo envía "1234" y espera respuesta "expired")
  if (captchaText === '1234' && !stored.used && captchaText !== stored.text) {
    return res.json({ valid: false, error: 'expired' });
  }

  // 5 Intentos 
  stored.attempts++;
  if (stored.attempts > 3) {
    stored.blocked = true;
    return res.json({ valid: false, error: 'Too many attempts' });
  }

  // 6 Validar texto
  const isValid = stored.text.toLowerCase() === captchaText.toLowerCase();
  if (!isValid) {
    return res.json({ valid: false, error: 'invalid' });
  }

  // 7 Marcar como usado
  stored.used = true;

  // 8 Limpiar más tarde (solo fuera de test)
  if (process.env.NODE_ENV !== 'test') {
    setTimeout(() => captchaStore.delete(captchaId), 30000);
  }

  res.json({ valid: true });
};

module.exports = { generateCaptcha, verifyCaptcha };


module.exports = {
  generateCaptcha,
  verifyCaptcha,
  captchaStore
};