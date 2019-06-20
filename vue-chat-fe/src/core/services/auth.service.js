import api from './api';

class AuthService {
  constructor() {
    this.api = api;
  }

  userLogin(params) {
    return this.api.post('/login', params);
  }

  userRegister(params) {
    return this.api.post('/register', params);
  }

  getUserInfo(uid) {
    return this.api.get(`/user/${uid}`);
  }

  getUserFriends(uid) {
    return this.api.get(`/user/${uid}/friends`);
  }

  getUsers(query) {
    return this.api.get('/users', query);
  }

  updateUser(userId, params) {
    return this.api.put(`/user/${userId}`, params);
  }

  updatePwd(userId, params) {
    return this.api.put(`/user/${userId}/password`, params);
  }
}

export default new AuthService();
