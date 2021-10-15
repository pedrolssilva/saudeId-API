const { validate } = require('../utils/manageToken');

function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  
  try {
    const decodedToken = validate(token);
    req.userId = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = {
  verifyJWT
}