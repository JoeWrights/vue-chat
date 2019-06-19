import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Home from './views/home/home.vue';
import Login from './views/login/login.vue';
import NotFound from './views/not-found/not-found.vue';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) { // eslint-disable-line
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        public: true,
      },
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => { // eslint-disable-line
  // 获取 store 里面的 token
  const { token } = store.state;
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else {
    next();
  }
});

export default router;
