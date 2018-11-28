import store from '@/stores';
import { validateHelpers as validate } from '@/utils/validate-helpers'

const aclUser = store.getters.getUserRoles ? store.getters.getUserRoles : [];

const countTotalRoles = (rolesAuthorized) => {

  if (!rolesAuthorized)
    throw new Error('Informe o parâmetro rolesAuthorized, não pode ser vazio.')

  if (validate.isArray(rolesAuthorized)) {
    rolesAuthorized = rolesAuthorized.reduce(item => item);
  }

  let total = aclUser.filter(role => {
    if (role.name === rolesAuthorized) {
      return true
    }
    return false;
  });

  return total.length > 0 ? true : false;

}

export const isAclDashboardAdmin = (...rolesAuthorized) => {
  if (!countTotalRoles(rolesAuthorized)) {
    sessionStorage.clear();
    return window.location.replace("/login");
  }

  return true;
}

export const isAclToPage = (...rolesAuthorized) => {
  if (!countTotalRoles(rolesAuthorized)) {
    return window.location.replace("/");
  }

  return true;
}

export const isAclToLink = (...rolesAuthorized) => {
  return countTotalRoles(rolesAuthorized);
}
