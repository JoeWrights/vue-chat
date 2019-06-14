const jwt = require('jsonwebtoken');

module.exports = (uid) => {
  const token = jwt.sign({
    uid,
  }, 'JoeWright', {
    expiresIn: '1day',
  });

  return token;
}