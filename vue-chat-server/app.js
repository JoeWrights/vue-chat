const http = require('http');
const Koa = require('koa');
const cors = require('koa2-cors'); //解决跨域问题
const WebSocket = require('ws');
const app = new Koa();
const UsersRouter = require('./routers/users'); // Koa路由引入
const ChatRouter = require('./routers/chat');
const GroupChatRouter = require('./routers/group-chat');
const GroupChat = require('./models/group-chat');

app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(UsersRouter.routes());
app.use(ChatRouter.routes());
app.use(GroupChatRouter.routes());

// app.listen(3006);

const server = http.createServer(app.callback());

// const wss = new WebSocket.Server({
//   port: 4000,
// });

const wss = new WebSocket.Server({
  server,
});

server.listen(3006);

// 给服务器对象上挂载一个广播的方法,向所有人广播
wss.broadcast = msg => {
  wss.clients.forEach(client => {
    // 如果连接是打开状态
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

wss.on('connection', ws => {
  console.log('server connection');
  let chatMessages;
  GroupChat.findAll().then(res => {
    console.log('query all chat messages');
    chatMessages = JSON.parse(JSON.stringify(res));
    chatMessages.forEach(item => {
      ws.send(JSON.stringify(item));
    });
  });

  ws.on('message', msg => {
    console.log('server receive msg:', msg);
    // ws.send(msg);
    wss.broadcast(msg);
    console.log('to :' + JSON.parse(msg).to);
    if (!JSON.parse(msg).to) {
      GroupChat.create(JSON.parse(msg))
        .then(() => {
          console.log('insert successfully');
        })
        .catch(e => {
          console.log('insert failed');
          console.log(e.message);
        });
    }
  });
});

console.log('app started at port 3006');