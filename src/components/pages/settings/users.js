require('../../bootstrap')

import store from '../../stores';

import UserIndex from './pages/users/UserIndex'
import { rolesAuthorizedToPage } from "./../../helpers/validates";

new Vue({
  el: '#content',
  store,
  components: {
    UserIndex
  },
  beforeCreate() {
    rolesAuthorizedToPage(this.$store.getters.getUserRoles, [
      "ADMIN"
    ]);
  }

});
