import Vue from 'vue';
import Router from 'vue-router';

import Signin from '@/views/signin';
import Signup from '@/views/signup';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'signup',
      component: Signup
    }
  ]
});
