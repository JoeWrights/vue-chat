import api from './api';

class ChatService {
  constructor() {
    this.api = api;
  }

  getGroupChatMessages() {
    return this.api.get('/group-chat');
  }

  privateChat(params) {
    return this.api.put('/chat', params);
  }

  getPrivateChatMessages(query = {}) {
    return this.api.get('/private', query);
  }

  addFriend(params) {
    return this.api.post('/add-friend', params);
  }
}

export default new ChatService();
