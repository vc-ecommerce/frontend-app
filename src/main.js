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
    const vm = this;
    this.$eventHub.$on("eventPublic", function (data) {
      vm.isPublic = data;
    });

    this.$eventHub.$on('eventError', function (obj) {
      vm.showError(obj)
    });
  },
  methods: {
    showError(obj) {
      swalErrorUnauthorized(obj);
    }
  },
  mounted() {

    if (this.isPublic === false) {

      let user = this.$store.getters.getUser;

      if (!user) {
        sessionStorage.clear();
        this.$router.push({ name: "auth.login" });
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
