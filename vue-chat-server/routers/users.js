const router = require('koa-router')();
const koaBody = require('koa-body');
const sha1 = require('sha1');
const Users = require('../models/users');
const Friends = require('../models/friends');
const createToken = require('../token/create-token');
const checkToken = require('../token/check-token');
const AVATAR_URL = require('../constants/avatar');

router.get('/api/users', checkToken, async ctx => {
  const { query } = ctx;
  let params = {};
  if (query.name) params.name = query.name;
  if (query.age) params.age = query.age;
  if (query.uid) params.uid = query.uid;

  const users = await Users.findAll({
    where: params,
    attributes: {
      exclude: ['token', 'password'],
    },
  });
  ctx.body = users;
});

router.get('/api/user/:id', checkToken, async ctx => {
  const user = await Users.findById(ctx.params.id);
  if (user.uid) {
    const { uid, name, phone, avatar, gender, age, addr, register_at } = user;
    ctx.body = {
      uid, name, phone, avatar, gender, age, addr, register_at,
    };
  } else {
    ctx.body = {
      error_type: 'bad_request',
      error_info: `没有id为${ctx.params.id}的用户`,
    }
    ctx.response.status = 400;
  }
});

router.post('/api/register', koaBody(), async ctx => {
  const { name } = ctx.request.body;
  ctx.request.body.token = createToken(name);
  ctx.request.body.password = sha1(ctx.request.body.password);
  const data = await Users.findAll({ attributes: ['name'] });
  const nameList = data.map(item => item.name);

  if (!nameList.includes(name)) {
    ctx.request.body.register_at = new Date().getTime();
    ctx.request.body.avatar = AVATAR_URL[Math.floor(Math.random() * 15)];
    const user = await Users.build(ctx.request.body).save();
    ctx.body = user;
    ctx.body.status = 201;
    Friends.create({
      fid: user.uid,
      fname: user.name,
      fphone: user.phone,
      favatar: user.avatar,
      fgender: user.gender,
      fage: user.age,
      faddr: user.addr,
    }).then(() => {
      console.log('register successfully');
    });
  } else {
    ctx.body = {
      error_info: '用户名已存在',
      error_type: 'bad_request',
    };
    ctx.response.status = 409;
  }
});

router.post('/api/login', koaBody(), async ctx => {
  const { name, password } = ctx.request.body;
  let data = await Users.findAll({
    where: {
      name,
    },
  });

  //no user returns error message
  if (data[0]) {
    let { token, password: pwd, uid, name, phone, avatar, gender, age, addr, register_at } = data[0];
    if (sha1(password) !== pwd) {
      ctx.body = {
        error_info: '密码错误',
        error_type: 'bad_request',
      };
      ctx.response.status = 400;
    } else {
      token = createToken(name);
      ctx.body = {
        token,
        user: {
          uid,
          name,
          phone,
          avatar,
          gender,
          age,
          addr,
          register_at,
        },
      };
    }
  } else {
    ctx.body = {
      error_info: '没有此用户',
      error_type: 'bad_request',
    };
    ctx.body.status = 400;
  } 
});

router.del('/api/user/:id', checkToken, async ctx => {
  try {
    const res = await Users.destroy({
      where: {
        uid: ctx.params.id,
      },
    });
    const responseMsg = {
      error_info: res ? '删除成功' : `没有id为${ctx.params.id}的用户`,
      status: res ? 200 : 400,
    };
    ctx.body = responseMsg;
  } catch(err) {
    ctx.body = {
      error_info: err,
      error_type: 'Internal Server Error',
    };
  }
});

router.put('/api/user/:id', checkToken, koaBody(), async ctx => {
  const body = ctx.request.body;
  await Users.update({ ...body }, {
    where: {
      uid: ctx.params.id,
    },
  });
  ctx.body = {
    status: 200,
  };
});

router.put('/api/user/:id/password', checkToken, koaBody(), async ctx => {
  let { originPassword, password } = ctx.request.body;
  const user = await Users.findById(ctx.params.id);
  if (originPassword && password) {
    if (sha1(originPassword) === user.password) {
      await Users.update({ password: sha1(password) }, {
        where: {
          uid: ctx.params.id,
        },
      });
      ctx.response.status = 200;
      ctx.body = {
        status: 200,
      };
    } else {
      ctx.response.status = 400;
      ctx.body = {
        error_info: '密码错误',
        error_type: 'bad_request',
      }
    }
  }
});

router.get('/api/user/:id/friends', checkToken, async ctx => {
  const { query } = ctx;
  let params = {};
  if (query.fid) params.fid = query.fid;

  let users = await Users.findAll({
    attributes: {
      exclude: ['token'],
    },
    where: {
      uid: ctx.params.id,
    },
  });
  const userFriends = await Users.findAll({
    include: [{
      model: Friends,
      where: params,
    }],
    attributes: {
      exclude: ['token', 'password'],
    },
    where: {
      uid: ctx.params.id,
    }
  });
  ctx.body = userFriends[0];
});

module.exports = router;
