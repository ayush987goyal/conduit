import Vue from 'vue';
import Router from 'vue-router';

import Signin from '@/views/signin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Signin
    }
  ]
});
