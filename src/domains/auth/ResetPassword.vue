<template>
  <form class="sign-box" @submit.prevent="submitForm">
    <header class="sign-title">Redefinição de senha</header>

    <div class="form-group">Digite seu e-mail de cadastro abaixo e clique em enviar.
      <br>Nós lhe enviaremos um e-mail com link para recadastrar sua senha.
    </div>

    <div class="form-group">
      <input
        type="email"
        required
        class="form-control"
        v-model="email"
        placeholder="Endereço de email"
      >
    </div>

    <ButtonSubmit bntTitle="Enviar" :ok="ok" :btnDisabled="btnDisabled" bntClass="btn btn-rounded"/>

    <div class="form-group">
      <div class="float-right">
        <router-link :to="{ name: 'auth.login' }" class="push-right">Cancelar</router-link>
      </div>
    </div>
  </form>
</template>
<script>
import { validateHelpers as validate } from "@/utils/validate-helpers";
import { domHelpers as dom } from "@/utils/dom-helpers";
import { notifyHelpers as notify } from "@/utils/notify-helpers";
import { htmlPageCenter } from "@/utils/jquery-helpers";
import { handleStatus } from "@/utils/promise-helpers";
import { errorWithNotify } from "@/utils/array-helpers";
import { HttpServices as service } from "@/services/http-services";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";

export default {
  name: "ResetPassword",
  props: [],
  components: {
    ButtonSubmit
  },
  data() {
    return {
      ok: false,
      email: "",
      btnDisabled: false
    };
  },
  created() {
    dom.createTitle("Redefinição de Senha");
    htmlPageCenter();
  },
  methods: {

    submitForm() {
      if (!validate.isEmail(this.email)) {
        notify.info("Atenção!", "Informe um email válido.");
        return;
      }

      this.btnDisabled = true;

      service
        .post("auth/reset", { email: this.email })
        .then(handleStatus)
        .then(res => {
          swal({
            title: "Sucesso!",
            text:
              "O link para redefinição de senha foi enviado para o seu e-mail!",
            type: "success",
            showCancelButton: false,
            confirmButtonText: "Ok!"
          });

          this.email = "";
          this.ok = true;
        })
        .catch(error => {
          if ("data" in error.response) {
            let errors = error.response.data.error;

            if (errors.data === "email_not_found") {
              notify.danger("Atenção!", "Email não encontrado.");
            } else {
              errorWithNotify(errors);
            }
          }

          console.log(error.response);
        });
      this.btnDisabled = false;
    }
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}
</style>
