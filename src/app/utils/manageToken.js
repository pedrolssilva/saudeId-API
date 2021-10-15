const jwt = require('jsonwebtoken');

function TokenException(message) {
  this.message = message;
  this.name = "TokenException";
}

function validate(token){
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if (err) {
      throw new TokenException(err);
    }
   return decoded.id;
  });
}

function create(payload, secondToExpire) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: secondToExpire
  });
}

module.exports = {
  validate,
  create
}