const router = require('koa-router')();
const checkToken = require('../token/check-token');
const GroupChat = require('../models/group-chat');

router.get('/api/group-chat', checkToken, async ctx => {
  const messages = await GroupChat.findAll();
  ctx.body = messages;
});

module.exports = router;
