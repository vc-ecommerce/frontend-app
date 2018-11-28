require('../../bootstrap')

import store from '../../stores';
import router from './pages/attributes/router'

import AttributeIndex from './pages/attributes/AttributeIndex'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { isAclToPage } from '@/utils/authorizations-helpers';

new Vue({
  el: '#content',
  store,
  router,
  components: {
    Breadcrumbs,
    AttributeIndex
  },
  beforeCreate() {
    isAclToPage(
      "ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR"
    );
  }

});
