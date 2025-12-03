const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

// VULNERABLE: Sin rate limiting para prevenir brute force
const login = async (req, res) => {
  const { username, password } = req.body;
  
  // aca deberiamos poner un limite para los inputs?
  
  const query = `SELECT * FROM users WHERE username = ?`;
  
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || 'supersecret123'
    );
    
    res.json({ token, username: user.username });
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ message: 'Usuario registrado con éxito' });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const checkUsername = (req, res) => {
  const { username } = req.body || {};

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  if (typeof username !== 'string' || !usernameRegex.test(username)) {
    // Respuesta genérica, sin detalles de error
    return res.status(200).json({ exists: false });
  }

  // 2) Consulta parametrizada (NADA de concatenar strings)
  const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      // Log interno, pero al cliente no le muestro el detalle
      console.error('DB error in checkUsername:', err);
      return res.status(200).json({ exists: false });
    }

    const count = results && results[0] && results[0].count ? results[0].count : 0;
    const exists = count > 0;

    // 3) Pequeño delay aleatorio para evitar ataques de timing
    const delay = Math.floor(Math.random() * 100) + 50; // 50–149 ms

    setTimeout(() => {
      res.json({ exists });
    }, delay);
  });
};
module.exports = {
  login,
  register,
  verifyToken,
  checkUsername
};