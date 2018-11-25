import { notifyHelpers as notify } from "@/utils/notify-helpers";

export const checkInternetConnected = () => {

  if ("onLine" in navigator) {

    let reconected = false;

    setInterval(() => {

      let online = navigator.onLine;

      if (!online) {
        reconected = 1;
        notify.danger(
          "Sem Conexão!",
          "Você está off-line. Verifique a conexão."
        );
      }

      if (online) {

        if (reconected === 1) {
          reconected = 0;
          notify.success(
            "Conexão efetuada.",
            "Sua conexão foi restabelecida."
          );
        }
      }

    }, 9000);

  }

}
