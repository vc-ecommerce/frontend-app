require('@/bootstrap')

import App from '@/App'
import router from '@/router'
import store from '@/stores';

Vue.config.productionTip = false;

import ValidatesHelper from "@/helpers/ValidatesHelper";

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
      document.addEventListener("DOMContentLoaded", () => {
        document.body.classList.remove("with-side-menu");
        document.body.classList.remove("control-panel");
        document.body.classList.remove("control-panel-compact");
        document.body.classList.add("auth");
      });
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
        return this.$router.push({ name: "auth.login" });
      }

      ValidatesHelper.userIsAuthorized(this.$store.getters.getUserRoles, [
        "ADMIN",
        "STAFF_AUDITOR",
        "STAFF_FINANCE",
        "STAFF_COMMERCIAL",
        "STAFF_SUPPORT",
        "STAFF_SALE",
        "STAFF_EDITOR",
        "STAFF_EXPEDITION",
      ]);

    }
  },
});
