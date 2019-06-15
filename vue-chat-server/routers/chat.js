const router = require('koa-router')();
const koaBody = require('koa-body');
const Chat = require('../models/chat');
const Users = require('../models/users');
const checkToken = require('../token/check-token');

router.put('/api/chat', checkToken, koaBody(), async ctx => {
  const body = ctx.request.body;
  const { from, to, message } = body;
  let chatHistory = await Chat.findAll({
    attributes: ['message'],
    where: {
      uid: from,
      fid: to,
    },
  });
  await Chat.update({
    message: chatHistory[0].message.concat(message),
  }, {
    where: {
      uid: from,
      fid: to,
    },
  });
  ctx.body = {
    status: 200,
  };
});

router.get('/api/private', checkToken, async ctx => {
  const { query } = ctx;
  const chatMessages = await Chat.findAll({
    attributes: {
      exclude: ['uid', 'fid'],
    },
    where: {
      uid: query.uid,
      fid: query.fid,
    },
  });
  ctx.body = chatMessages[0].message;
});

router.post('/api/add-friend', koaBody(), checkToken, async ctx => {
  const { uid, to } = ctx.request.body;
  Promise.all([
    Chat.create({
      uid,
      fid: to,
      message: []
    }),
    Chat.create({
      uid: to,
      fid: uid,
      message: [],
    })
  ]).then(() => {
    console.log('add friend successfully');
  });
  const friend = await Users.findById(uid);
  ctx.body = {
    uid: friend.uid,
    name: friend.name,
    phone: friend.phone,
    avatar: friend.avatar,
    gender: friend.gender,
  };
});

module.exports = router;
