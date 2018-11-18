import Vue from 'vue';
window.Vue = Vue;

import axios from 'axios';
import VueAxios from 'vue-axios';
import { urlApi, urlSite } from '@/configs';

require ('@/commons/html-scripts');

Vue.use(VueAxios, axios);

Vue.prototype.$eventHub = new Vue();
Vue.prototype.$urlApi = urlApi;
Vue.prototype.$urlSite = urlSite;
