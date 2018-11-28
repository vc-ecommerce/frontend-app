require('../../bootstrap')

import store from '../../stores';
import router from './pages/pages-info/router'

import PageIndex from './pages/pages-info/PageIndex'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { isAclToPage } from '@/utils/authorizations-helpers';

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    PageIndex
  },
  beforeCreate() {
    isAclToPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
