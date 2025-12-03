const request = require('supertest');
const express = require('express');
const path = require('path');
const fs = require('fs');
const vulnerabilityRoutes = require('../../src/routes/vulnerabilities');

describe('Seguridad: File Upload', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', vulnerabilityRoutes);

    // Middleware de manejo de errores para Multer
    app.use((err, req, res, next) => {
      if (err && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' });
      }
      if (err && /File type not allowed/i.test(err.message)) {
        return res.status(400).json({ error: 'File type not allowed' });
      }
      if (err && /Invalid filename/i.test(err.message)) {
        return res.status(400).json({ error: 'Invalid filename' });
      }
      if (err) {
        return res.status(400).json({ error: 'Upload error' });
      }
      next();
    });

    // Crear directorio temporal de archivos de prueba si no existe
    const tmpDir = path.join(__dirname, '..', 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Crear algunos archivos de prueba
    fs.writeFileSync(path.join(tmpDir, 'test.txt'), 'contenido seguro');
    fs.writeFileSync(path.join(tmpDir, 'malware.exe'), 'binario falso');
  });

  const getTmpPath = (name) => path.join(__dirname, '..', 'tmp', name);

  test('❌ DEBE FALLAR: No debe permitir tipos de archivo peligrosos', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', getTmpPath('malware.exe'));

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/File type not allowed/i);
  });

  test('❌ DEBE FALLAR: Debe validar tamaño máximo de archivo', async () => {
    // Crear archivo grande temporal (> 2 MB)
    const bigPath = getTmpPath('big.txt');
    if (!fs.existsSync(bigPath) || fs.statSync(bigPath).size < 2.5 * 1024 * 1024) {
      const stream = fs.createWriteStream(bigPath);
      const chunk = Buffer.alloc(1024 * 1024, 'a'); // 1 MB
      for (let i = 0; i < 3; i++) {
        stream.write(chunk);
      }
      stream.end();
    }

    const response = await request(app)
      .post('/api/upload')
      .attach('file', bigPath);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/too large|File too large/i);
  });

  test('❌ DEBE FALLAR: No debe permitir path traversal en el nombre del archivo', async () => {
    const tmpDir = path.join(__dirname, '..', 'tmp');
    const payloadPath = path.join(tmpDir, 'payload.txt');
    fs.writeFileSync(payloadPath, 'payload');

    const response = await request(app)
      .post('/api/upload')
      .attach('file', payloadPath, '../evil.txt');

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/Invalid filename/i);
  });

  test('❌ DEBE FALLAR: Debe almacenar el archivo en un directorio seguro con nombre sanitizado', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', getTmpPath('test.txt'));

    if (response.status === 200) {
      expect(response.body.filename).toBeDefined();
      expect(response.body.path).toMatch(/^\/uploads\//);
      expect(response.body.path).not.toContain('..');
    } else {
      expect(response.status).toBe(400);
    }
  });
});

describe('📝 INSTRUCCIONES PARA CORREGIR FILE UPLOAD', () => {
  test('Implementar las siguientes medidas de seguridad:', () => {
    const instrucciones = `
    1. Validar tipo MIME y extensión:
        - Aceptar solo extensiones seguras (.png, .jpg, .jpeg, .pdf, .txt)
        - Verificar tanto mimetype como extensión

    2. Limitar tamaño máximo:
        - Configurar limits en Multer (por ejemplo, 2MB)
        - Manejar el error de "LIMIT_FILE_SIZE" devolviendo 400

    3. Sanitizar nombre de archivo:
        - Remover rutas, "..", "/" y "\\\\"
        - Generar nombre aleatorio (uuid) y guardar solo extensión

    4. Directorio seguro:
        - Guardar en un directorio fijo (por ejemplo, uploads/)
        - Nunca usar partes del nombre proporcionado por el usuario como ruta

    5. Validar que solo se suban archivos esperados:
        - Si es avatar, solo imágenes
        - Si es documento, solo PDF/TXT

    6. No devolver rutas internas del sistema:
        - Exponer solo rutas lógicas (/uploads/archivo.ext)
        - No devolver paths absolutos del servidor
    `;

    console.log(instrucciones);
    expect(true).toBe(true);
 });
});