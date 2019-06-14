const jwt = require('jsonwebtoken');
//检查token是否过期
module.exports = async ( ctx, next ) => {
  //拿到token
  const authorization = ctx.get('Authorization');
  const token = authorization.replace('Bearer ', '');
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization');
  }
  if (!authorization.includes('Bearer')) {
    ctx.throw(400, 'invalid token');
  }

  jwt.verify(token, 'JoeWright', (error, decoded) => {
    if (error) {
      ctx.body = error.message;
      return;
    }
    return decoded;
  });

  await next();
};
