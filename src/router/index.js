import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import { index as auth } from './routes-modules/auth'

export default new Router({
  mode: 'history',
  routes: [
    ...auth
  ]
})
