const express = require('express');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const csrf = require('csurf');
const csrfProtection = csrf(); // usa la sesión si está presente
const csrfToken = require('../middleware/csrf-token')
const validateOrigin = require('../middleware/validateOrigin')

//Conseguimos el token
router.get('/csrf-token', csrfProtection, csrfToken.CSRFTOKEN)

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia
router.post('/transfer', validateOrigin.validateOrigin, csrfProtection, vulnerabilityController.transfer);

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

router.use((err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token invalid or missing' });
  }
  next(err);
});



module.exports = router;
