export const validateHelpers = {

  isPagesPublic: () => {
    const url = window.location.pathname.substring(1).split('/');
    const pagesPublic = [
      "login",
      "password"
    ];
    return pagesPublic.includes(url[0]);
  },

  rolesUserAuthorizedPanelAdmin: (roles, ...keys) => {
    let count = 0;
    if (roles) {
      roles.forEach(function (role) {
        if (keys.indexOf(role.name) > -1) {
          count++;
        }
      });
    }
    if (count === 0) {
      sessionStorage.clear();
      return window.location.replace("/login");
    }
  },

  userIsAuthorizedPage: (roles, keys) => {
    let count = 0;
    if (roles) {
      roles.forEach(function (role) {
        if (keys.indexOf(role.name) > -1) {
          count++;
        }
      });
    }
    if (count === 0) {
      return window.location.replace("/");
    }
  },

  isRoleUser: (roles, keys) => {
    let count = 0;
    if (roles) {
      roles.forEach(function (role) {
        if (keys.indexOf(role.name) > -1) {
          count++;
        }
      });
    }
    if (count > 0) {
      return true
    }
    return false
  },

  validateEmail: (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
