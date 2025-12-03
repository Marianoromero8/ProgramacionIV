const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Carpeta segura de uploads
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Genera nombre aleatorio sin usar el original
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = crypto.randomBytes(16).toString('hex');
    cb(null, uniqueName + ext);
  }
});

// Extensiones permitidas
const allowedExts = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.txt'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExts.includes(ext)) {
    return cb(new Error('Tipo de archivo no permitido'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;