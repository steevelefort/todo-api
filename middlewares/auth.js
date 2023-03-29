const config = require('../config')

module.exports = function(req, res, next) {

  const token = req.headers['authorization'];
  if (token && token.includes('Bearer ') && token.split(' ')[1] === config.token)
    next()
  else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
