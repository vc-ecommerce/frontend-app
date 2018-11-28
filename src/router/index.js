import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import { index as auth } from './routes-modules/auth';
import { index as account } from './routes-modules/account';
import { index as setting } from './routes-modules/setting';
import { index as home } from './routes-modules/home';

export default new Router({
  mode: 'history',
  routes: [
    ...auth,
    ...account,
    ...setting,
    ...home
  ]
})
