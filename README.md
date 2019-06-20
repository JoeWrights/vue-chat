# vue-chat
A chat application based on Vue.js and Koa.js

## Clone Project
```
git clone https://github.com/JoeWrights/vue-chat.git
```

## Project setup
```
cd vue-chat-server
npm install
```
```
cd vue-chat-fe
npm install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

注意：
1. `.env.development`里的地址改成自己的，而且连接websocket时，websocket的主机地址应该和这里的主机地址相同。
例如：这里的地址是：`VUE_APP_API_URL = http://192.168.43.188:3006`，则websocket地址为：`ws://192.168.43.188:3006/chat`，`/chat`要不要都可以。
2. 开发是最好建一个与`.env.development`同级的`.env.development.local`，这个不会被提交到repo。

效果图：

登录
![login](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/login.png)

注册
![register](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/register.png)

群聊
![groupChat](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/groupchat1.png)
![groupChat](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/groupchat2.png)
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/groupmembers.png)

好友聊天

![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/friendwin.png)

添加好友：
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/addfriends.png)
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/notifications.png)
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/verifyaddfriend.png)

个人信息：
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/profile.png)
![](https://raw.githubusercontent.com/JoeWrightss/vue-chat/master/vue-chat-fe/src/assets/shortcuts/updatepwd.png)
