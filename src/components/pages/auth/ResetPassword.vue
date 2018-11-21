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
        <router-link :to="{ name: 'auth.login' }" @click.native="$eventHub.$emit('eventDocumentTitle', {data: 'Fazer Login'})" class="push-right">Cancelar</router-link>
      </div>
    </div>

  </form>
</template>
<script>
import ToolsHelper from "@/helpers/ToolsHelper";
import ValidatesHelper from "@/helpers/ValidatesHelper";
import JQueryHelper from "@/helpers/JQueryHelper";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import DocumentFactory from "@/factory/DocumentFactory";
import NotifyHelper from "@/helpers/NotifyHelper";

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
      const api = `${this.$urlApi}/auth/reset`;
      Vue.axios
        .post(api, {
          email: this.email
        })
        .then(response => {
          swal({
            title: "Sucesso!",
            text:
              "O link para redefinição de senha foi enviado para o seu e-mail!",
            type: "success",
            showCancelButton: false,
            confirmButtonText: "Ok!"
          });
          this.email = "";
          this.btnDisabled = false;
          this.ok = true;
        })
        .catch(error => {
          this.btnDisabled = false;

          if (error.response.status === 404) {
            return NotifyHelper.danger("Atenção!", "Email não encontrado.");
          } else {
            let errors = Array(JSON.parse(error.response.data.error));
            errors.forEach(value => {
              let values = Object.values(value);
              values.forEach(value => {
                NotifyHelper.danger("Atenção!", value);
              });
            });
          }
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
