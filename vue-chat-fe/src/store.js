import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'),
    user: JSON.parse(sessionStorage.getItem('user')),
  },

  getters: {
    uid(state) {
      return state.user.uid;
    },

    user(state) {
      return state.user;
    },

    token(state) {
      return state.token;
    },
  },

  mutations: {
    LOGIN: (state, data) => {
      state.token = data;
      sessionStorage.setItem('token', data);
    },
    LOGOUT: (state) => {
      state.token = null;
      sessionStorage.removeItem('token');
    },
    USER: (state, data) => {
      state.user = data;
      sessionStorage.setItem('user', JSON.stringify(data));
    },
  },

  actions: {
    userLogin({ commit }, data) {
      commit('LOGIN', data);
    },
    userLogout({ commit }) {
      commit('LOGOUT');
    },
    userInfo({ commit }, data) {
      commit('USER', data);
    },
  },
});
