import Vue from 'vue';
window.Vue = Vue;

import axios from 'axios';
import VueAxios from 'vue-axios';
import { urlApi, urlSite } from '@/configs';

Vue.use(VueAxios, axios);
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$urlApi = urlApi;
Vue.prototype.$urlSite = urlSite;

require('@/commons/html-scripts');
import ToolsHelper from '@/helpers/ToolsHelper';

const successCallback = (response) => {
  return response;
}

const errorCallback = (error) => {
  ToolsHelper.swalErrorApi(error);
  return Promise.reject(error);
}

Vue.axios.interceptors.response.use(successCallback, errorCallback);
