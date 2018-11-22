<template>
  <form class="sign-box" @submit.prevent="submitForm">
    <header class="sign-title">Redefinição de senha</header>

    <div class="form-group">
      Digite seu e-mail de cadastro abaixo e clique em enviar. <br />
      Nós lhe enviaremos um e-mail com link para recadastrar sua senha.
    </div>

    <div class="form-group">
      <input type="email" required class="form-control" v-model="email" placeholder="Endereço de email"/>
    </div>

    <ButtonSubmit
      bntTitle="Enviar"
      :ok="ok"
      :btnDisabled="btnDisabled"
      bntClass="btn btn-rounded" />

    <div class="form-group">
      <div class="float-right">
        <router-link :to="{ name: 'auth.login' }" class="push-right">Cancelar</router-link>
      </div>
    </div>

  </form>
</template>
<script>
import ValidatesHelper from "@/helpers/ValidatesHelper";
import JQueryHelper from "@/helpers/JQueryHelper";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import DocumentFactory from "@/factory/DocumentFactory";
import NotifyHelper from "@/helpers/NotifyHelper";
import AxiosService from "@/services/AxiosService";

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
  methods: {
    cleanData(data) {
      return ToolsHelper.cleanDataApi(data);
    },
    submitForm() {
      if (!ValidatesHelper.validateEmail(this.email)) {
        NotifyHelper.info("Atenção!", "Informe um email válido.");
        return;
      }

      this.btnDisabled = true;

      return new Promise((resolve, reject) => {
        AxiosService.post("auth/reset", { email: this.email })
          .then(response => {
            resolve(
              swal({
                title: "Sucesso!",
                text:
                  "O link para redefinição de senha foi enviado para o seu e-mail!",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "Ok!"
              })
            );

            this.email = "";
            this.btnDisabled = false;
            this.ok = true;
          })
          .catch(error => {
            this.btnDisabled = false;

            if (error.response.status === 404) {
              reject(NotifyHelper.danger("Atenção!", "Email não encontrado."));
            } else {
              Array(JSON.parse(error.response.data.error)).forEach(value => {
                Object.values(value).forEach(value => {
                  reject(NotifyHelper.danger("Atenção!", value));
                });
              });
            }
          });
      });
    }
  },
  mounted() {
    DocumentFactory.createTitle("Redefinição de Senha");
    JQueryHelper.pageCenter();
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}
</style>
