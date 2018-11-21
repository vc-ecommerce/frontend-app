require('@/bootstrap')

import App from '@/App'
import router from '@/router'
import store from '@/stores';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
