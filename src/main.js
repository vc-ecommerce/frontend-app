// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('@/bootstrap')

import App from '@/App'
import router from '@/router'
import store from '@/stores';

Vue.config.productionTip = false;

import { userIsAuthorized } from "@/helpers/validates";
import { swalErrorUnauthorized } from "@/helpers/tools";

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
    this.$eventHub.$on("eventPublic", data => this.isPublic = data);
    this.$eventHub.$on('eventError', obj => this.showError(obj));
  },
  methods: {
    showError(obj) {
      swalErrorUnauthorized(obj);
    }
  },
  mounted() {

    if (this.isPublic !== true) {

      let user = this.$store.getters.getUser ? this.$store.getters.getUser : false;

      if (!user) {
        sessionStorage.clear();
        return this.$router.push({ name: "auth.login" });
      }

      userIsAuthorized(this.$store.getters.getUserRoles, [
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
