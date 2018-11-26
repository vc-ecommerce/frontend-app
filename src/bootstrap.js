import Vue from 'vue';
window.Vue = Vue;

import axios from 'axios';
import VueAxios from 'vue-axios';
import { urlSite } from '@/configs';

Vue.use(VueAxios, axios);
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$urlSite = urlSite;

require('@/commons/html-scripts');
import { toolHelpers as tool } from "@/utils/tool-helpers";

const successCallback = (response) => {
  return response;
}

const errorCallback = (error) => {
  tool.swalErrorApi(error);
  return Promise.reject(error);
}

Vue.axios.interceptors.response.use(successCallback, errorCallback);
