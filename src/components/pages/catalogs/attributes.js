require('../../bootstrap')

import store from '../../stores';
import router from './pages/attributes/router'

import AttributeIndex from './pages/attributes/AttributeIndex'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { rolesAuthorizedToPage } from '@/utils/authorizations-helpers';

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    AttributeIndex
  },
  beforeCreate() {
    rolesAuthorizedToPage(this.$store.getters.getUserRoles, [
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    ]);
  }

});
