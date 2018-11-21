require('@/bootstrap')

import App from '@/App'
import router from '@/router'
import store from '@/stores';

Vue.config.productionTip = false;

import ValidatesHelper from "@/helpers/ValidatesHelper";
import DocumentFactory from '@/factory/DocumentFactory'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data() {
    return {
      isPublic: false
    }
  },
  created() {
    const vm = this;
    if (ValidatesHelper.isPagesPublic()) {
      DocumentFactory.removeClassBody();
      vm.isPublic = true;
    }
  },
  mounted() {

    if (this.isPublic !== true) {

      let user = this.$store.getters.getUser ? this.$store.getters.getUser : false;

      if (!user) {
        sessionStorage.clear();
        localStorage.clear();
        localStorage.setItem('httpReferer', document.URL);
        return window.location.replace("/login");
      }

      ValidatesHelper.rolesUserAuthorizedPainelAdmin(
        this.$store.getters.getUserRoles,
        "ADMIN",
        "STAFF_AUDITOR",
        "STAFF_FINANCE",
        "STAFF_COMMERCIAL",
        "STAFF_SUPPORT",
        "STAFF_SALE",
        "STAFF_EDITOR",
        "STAFF_EXPEDITION",
      );

    }

  }

});
