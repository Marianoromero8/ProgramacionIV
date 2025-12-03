const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  loginRateLimiter,
  captchaM,
  bruteForceProtection,
  trackFailedLogin,
  checkUsernameLimiter
} = require('./../middleware/bruteForce.middleware');

// Rutas de autenticación

router.post(
  '/login',

  trackFailedLogin,      // 1. marcar fallos del intento anterior
  bruteForceProtection,  // 2. delay según los fallos acumulados
  captchaM,              // 3. requiere captcha después de 3 fallos
  loginRateLimiter,      // 4. 429 después de demasiados intentos

  authController.login   // 5. ejecutar el login real
  
);

router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', checkUsernameLimiter, authController.checkUsername);
//router.post('/check-username', authController.checkUsername);

module.exports = router;
