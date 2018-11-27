import { validateHelpers as validate } from '@/utils/validate-helpers'

const countTotalRoles = (roles, rolesAuthorized) => {

  if (!roles)
    throw new Error('Informe o parâmetro roles, não pode ser vazio.')

  if (!validate.isArray(roles))
    throw new Error('Informe o parâmetro roles, no formato Array')

  if (!rolesAuthorized)
    throw new Error('Informe o parâmetro rolesAuthorized, não pode ser vazio.')

  if (validate.isArray(rolesAuthorized)) {
    rolesAuthorized = rolesAuthorized.reduce(item => item);
  }

  let count = 0;

  if (roles) {
    roles.forEach(function (role) {
      if (rolesAuthorized.indexOf(role.name) > -1) {
        count++;
      }
    });
  }
  return count;
}

export const rolesAuthorizedPanelAdmin = (roles, ...rolesAuthorized) => {
  if (countTotalRoles(roles, rolesAuthorized) <= 0) {
    sessionStorage.clear();
    return window.location.replace("/login");
  }
}

export const rolesAuthorizedToPage = (roles, ...rolesAuthorized) => {
  if (countTotalRoles(roles, rolesAuthorized) <= 0) {
    return window.location.replace("/");
  }
}

export const filterLinksUserToRoles = (roles, ...rolesAuthorized) => {
  if (countTotalRoles(roles, rolesAuthorized) <= 0)
    return false;
  return true;
}
