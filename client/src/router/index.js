import Vue from 'vue';
import Router from 'vue-router';

import Signin from '@/views/Signin';
import Signup from '@/views/Signup';
import Settings from '@/views/Settings';

import AuthGuard from './auth-guard';

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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: AuthGuard
    }
  ]
});
