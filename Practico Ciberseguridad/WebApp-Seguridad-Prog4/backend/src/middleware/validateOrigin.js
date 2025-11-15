const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'];
function validateOrigin(req, res, next) {
  const origin = req.get('Origin');
  const referer = req.get('Referer');

  if (origin) {
    if (!allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }
  } else if (referer) {
    try {
      const r = new URL(referer);
      const originFromRef = `${r.protocol}//${r.host}`;
      if (!allowedOrigins.includes(originFromRef)) {
        return res.status(403).json({ error: 'Referer not allowed' });
      }
    } catch (e) {
      return res.status(403).json({ error: 'Referer not allowed' });
    }
  }
  // Si no hay origin/referer está bien (pets same-site requests); continuar
  next();
}
module.exports = {
  validateOrigin
};
