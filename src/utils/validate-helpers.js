export const validateHelpers = {

  isPagePublic: () => {
    const url = window.location.pathname.substring(1).split('/');
    const pagesPublic = [
      "login",
      "password"
    ];
    return pagesPublic.includes(url[0]);
  },

  objectToString: (o) => {
	  return Object.prototype.toString.call(o);
	},

  isEmail: (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  isArray: (ar) => {
	  return Array.isArray(ar);
	},

  isNumber: (arg) => {
	  return typeof arg === 'number';
  },

  isString: (arg) => {
	  return typeof arg === 'string';
	},

  isObject: (value) => {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type == 'function' || (value && type == 'object') || false;
  },

  isNaN: (value) => {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
    return isNumber(value) && value != +value;
  },

  isRegExp: (re) => {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	},

  isSpace: (charCode) => {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  },

  isError: (e) => {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
  },

  isFunction: (arg) => {
	  return typeof arg === 'function';
  },

  isPrimitive: (arg) => {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
  },

  isUndefined: (arg) => {
	  return typeof arg === 'undefined';
	},

  isSymbol: (arg) => {
	  return typeof arg === 'symbol';
	},

	isUndefined: (arg) => {
	  return arg === void 0;
  },

  isError: (e) => {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	},


}
