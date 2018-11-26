require('../../bootstrap')

import store from '../../stores';

import PrivilegeIndex from './pages/privileges/PrivilegeIndex'
import { rolesAuthorizedToPage } from '@/utils/authorizations-helpers';

new Vue({
  el: '#content',
  store,
  components: {
    PrivilegeIndex
  },
  beforeCreate() {
    rolesAuthorizedToPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
