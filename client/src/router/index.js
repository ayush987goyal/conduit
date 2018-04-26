import Vue from 'vue';
import Router from 'vue-router';

import Signin from '@/views/Signin';
import Signup from '@/views/Signup';

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
