require('../../bootstrap')

import store from '../../stores';

import RoleIndex from './pages/roles/RoleIndex'
import { rolesAuthorizedToPage } from '@/utils/authorizations-helpers';

new Vue({
  el: '#content',
  store,
  components: {
    RoleIndex
  },
  beforeCreate() {
    rolesAuthorizedToPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
