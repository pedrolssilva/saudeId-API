const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyJWT
}