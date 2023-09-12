const jwt = require("jsonwebtoken");
const messages = require('../constants/messages');

module.exports = function (req, res, next) {

  const authorizationHeader = req.headers.authorization; // express headers are auto converted to lowercase

  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.uid = decoded.uid;
        req.user = decoded;
        req.isAdmin = () => (decoded && decoded.role && decoded.role.includes('admin')) ? true : false;
        req.hasRole = (role) => (decoded && decoded.role && decoded.role.includes(role)) ? true : false;
        next();
      }
    });
  } else {
    next(Error(messages.TOKEN_NOT_FOUND));
  }
};
