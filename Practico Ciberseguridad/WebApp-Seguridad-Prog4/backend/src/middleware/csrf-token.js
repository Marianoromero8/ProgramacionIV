const CSRFTOKEN = (req, res) => {
  // req.csrfToken() lanzará si csurf no pudo inicializarse correctamente
  try {
    res.cookie('csrf_samesite_test', '1', { httpOnly: true, sameSite: 'Strict' });
    const token = req.csrfToken();
    res.json({ csrfToken: token });
  } catch (err) {
    // si no hay sesión o csurf no está inicializado, enviar error claro
    return res.status(500).json({ error: 'Could not generate CSRF token' });
  }
};

module.exports = {
  CSRFTOKEN
};