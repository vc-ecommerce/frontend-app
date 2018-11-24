import { notifyHelpers as notify } from "@/utils/notify-helpers";

export const isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};

export const isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};

export const errorWithNotify = (errors) => {
  Array(JSON.parse(errors))
    .reduce((errors, value) => Object.values(value), [])
    .forEach(error => {
      notify.danger("Atenção!", error);
    });
}
