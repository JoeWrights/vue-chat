import Vue from 'vue';
import { mapGetters } from 'vuex';
import { first, uniqBy } from 'lodash';
import emojiList from '@/core/constant/constant';
import AuthService from '@/core/services/auth.service';
import ChatService from '@/core/services/chat.service';
import PrivateChat from '@/components/private-chat.vue';
import UpdateUserDialog from '@/components/update-user-dialog.vue';
import UpdatePwdDialog from '@/components/update-pwd-dialog.vue';

export default {
  name: 'ChatContainer',

  components: {
    PrivateChat,
    UpdateUserDialog,
    UpdatePwdDialog,
  },

  data() {
    const tabs = {
      chat: '#icon_people',
      search: '#icon_search',
      message: '#icon_message',
    };

    return {
      context: '',
      friends: [],
      friend: {},
      toggle: false,
      listIndex: 99999,
      emojiList,
      selectedEmoji: [],
      message: '',
      emoji: '',
      filters: {
        keyword: '',
      },
      users: [],
      webSocket: null,
      groupChatMembers: [],
      groupChatMessages: [],
      privateChatMessages: [],
      notifications: [],
      timer: null,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      profileForm: {
        name: '',
        addr: '',
        phone: '',
        gender: 'male',
      },
      tabs,
      selected: 'chat',
      notificationCount: 0,
    };
  },

  created() {
    this.loadUserFriends();
    this.loadUsers();
    this.initWebSocket();
  },

  mounted() {
    setInterval(() => {
      this.loadPrivateMessages();
    }, 2000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  computed: {
    ...mapGetters(['user']),

    chatMembers() {
      return uniqBy(this.groupChatMembers, 'uid');
    },
  },

  watch: {
    groupChatMembers: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
    },

    friend() {
      this.loadPrivateMessages();
    },

    ['filters.keyword']() { // eslint-disable-line
      this.loadUsers();
    },

    selected: {
      immediate: true,
      handler(selected) {
        if (selected === 'chat') {
          this.loadUserFriends();
        }
        if (selected === 'message') {
          this.notificationCount = 0;
        }
      },
    },
  },

  methods: {
    initWebSocket() {
      const wsUrl = 'ws://192.168.43.188:3006/chat';
      this.webSocket = new WebSocket(wsUrl);
      this.webSocket.onmessage = (msg) => {
        const message = JSON.parse(msg.data);
        if (!message.to) {
          this.groupChatMembers.push(message);
        } else if (message.to === this.user.uid) {
          this.notifications.push(message);
          this.notificationCount = this.notifications.length;
        }
      };
    },

    loadGroupChatMessages() {
      ChatService.getGroupChatMessages().then((res) => {
        this.groupChatMembers = res;
      });
    },

    async loadPrivateMessages() {
      if (this.friend.fid) {
        const query = {
          uid: this.user.uid,
          fid: this.friend.fid,
        };
        this.privateChatMessages = await ChatService.getPrivateChatMessages(query);
      }
    },

    async loadUserFriends() {
      const { friends } = await AuthService.getUserFriends(this.user.uid);
      if (friends === undefined) return;
      this.friends = friends;
      this.friend = first(this.friends);
    },

    async loadUsers() {
      const users = await AuthService.getUsers({
        name: this.filters.keyword,
      });
      const diffUsers = users.filter(user => user.uid !== this.user.uid);
      let searchUsers;
      if (this.friends.length) {
        this.friends.forEach((friend) => {
          const availableUsers = diffUsers.filter(user => user.uid !== friend.fid);
          searchUsers = availableUsers;
        });
        this.users = searchUsers;
      } else {
        this.users = diffUsers;
      }
    },

    chatWith(friend, index) {
      this.friend = friend;
      this.listIndex = index;
    },

    groupChat() {
      this.listIndex = 99999;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    handleCommands(command) {
      if (command === 'userLogout') {
        this.userLogout();
      } else if (command === 'profile') {
        this.$refs.updateUserDialog.dialogFormVisible = true;
      } else {
        this.$refs.updatePwdDialog.dialogFormVisible = true;
      }
    },

    userLogout() {
      this.$store.dispatch('userLogout');
      this.$router.push({
        name: 'login',
      });
      window.location.reload();
    },

    toggleFriendList() {
      this.toggle = !this.toggle;
    },

    getEmoji(emoji) {
      this.selectedEmoji.push(emoji);
      this.message = this.selectedEmoji.join('');
    },

    sendMessage() {
      if (this.message.length > 200) {
        Vue.noty.error('发送内容不能超过200个字符');
        return;
      }
      if (this.listIndex === 99999) { // group chat
        const onlineUser = JSON.stringify({
          uid: this.user.uid,
          name: this.user.name,
          avatar: this.user.avatar,
          chat_time: new Date().getTime(),
          message: this.message,
          pic: '',
          unread: 1,
        });
        if (!this.message) return;
        this.webSocket.send(onlineUser);
      } else { // private chat
        const privateMsg = {
          message: [
            {
              name: this.user.name,
              avatar: this.user.avatar,
              pic: '',
              content: this.message,
              chat_time: new Date().getTime(),
            },
          ],
        };
        const params1 = {
          from: this.user.uid,
          to: this.friend.fid,
          ...privateMsg,
        };
        const params2 = {
          from: this.friend.fid,
          to: this.user.uid,
          ...privateMsg,
        };
        if (!this.message) return;
        ChatService.privateChat(params1).then(() => {
          console.log('send successfully');
        });
        ChatService.privateChat(params2).then(() => {
          console.log('send successfully');
        });
      }
      this.message = '';
    },

    updateUser(form) {
      AuthService.updateUser(this.user.uid, form).then(() => {
        Vue.noty.success('修改个人信息成功');
        this.$store.dispatch('userInfo', form);
      });
      this.$refs.updateUserDialog.dialogFormVisible = false;
    },

    updatePwd(form) {
      AuthService.updatePwd(this.user.uid, form).then(() => {
        Vue.noty.success('修改密码成功');
      });
      this.$refs.updatePwdDialog.dialogFormVisible = false;
      this.$refs.updatePwdDialog.passwordForm = {};
    },

    selectTab(index) {
      this.selected = index;
    },

    askToMyFriend(user) {
      const { uid, name, avatar } = this.user;
      this.$confirm(`是否要请求添加${user.name}为好友？`, '添加好友', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.webSocket.send(JSON.stringify({
          uid,
          name,
          avatar,
          to: user.uid,
        }));
        Vue.noty.success('验证信息已发送');
      }).catch(() => {
        Vue.noty.info('取消操作');
      });
    },

    addToMyFriend(notification) {
      ChatService.addFriend(notification).then(() => {
        Vue.noty.success('添加好友成功');
        this.loadUserFriends();
        this.notifications.splice(notification.uid, 1);
        this.selected = 'chat';
      });
    },

    ignoreNotification(index) {
      this.notifications.splice(index, 1);
    },

    scrollToBottom() {
      this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
    },
  },
};
