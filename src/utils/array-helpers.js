import { notifyHelpers as notify } from "@/utils/notify-helpers";

export const errorWithNotify = (errors) => {

  Array(JSON.parse(errors))
    .reduce((errors, value) => Object.values(value), [])
    .forEach(error => {
      notify.danger("Atenção!", error);
    });

}
