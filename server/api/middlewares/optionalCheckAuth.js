const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } else {
    next();
  }
};
