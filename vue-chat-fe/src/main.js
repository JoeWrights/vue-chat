import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// plugins
import VueNoty from 'vuejs-noty'; // eslint-disable-line
import ElementUI from './plugins/element';

// 1 part style
import 'vuejs-noty/dist/vuejs-noty.css';
import './assets/styles/index.scss';

// filters
import './filters';

// assets
import '@/assets/svgs';

Vue.use(ElementUI);

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  layout: 'topCenter',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
