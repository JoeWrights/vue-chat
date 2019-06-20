import Vue from 'vue';
import { get as getValue } from 'lodash';
import store from '../../store';

/**
 * auth service handle global authorization.
 */
export default {
  request(config) {
    if (!config.headers.Authorization && store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
  },

  // global ajax success handler
  response(res) {
    if (/^20\d/.test(res.status)) {
      return res.data;
    }
    return res;
  },

  // global ajax error handler
  responseError(error) {
    error = JSON.parse(JSON.stringify(error));
    // error response
    const { response = {} } = error;
    switch (response.status) {
      case 502:
      Vue.noty.error('后端出问题了, 请联系管理员');
        break;
      case 401:
        // AuthService.logout();
        if (Vue.$router) {
          Vue.$router.push({
            name: 'home',
          });
        }
        break;
      case 403:
        if (getValue(response, 'headers.Authorization')) {
          Vue.noty.error('权限不足');
        } else {
          Vue.noty.error(getValue(response, 'data.error_info'));
        }
        break;
      default:
      Vue.noty.error(getValue(response, 'data.error_info', '请求发生错误'));
    }
    return Promise.reject(response);
  },
};
