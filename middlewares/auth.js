const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../errors/errors');

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
