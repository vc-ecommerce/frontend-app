<template>
  <div>
    <section>
      <Breadcrumb title="Minha Conta">
        <li>
          <router-link :to="{ name: 'account.index'}">Minha Conta</router-link>
        </li>
        <li class="active">Editar dados</li>
      </Breadcrumb>
    </section>
    <section class="card">
      <form @submit.prevent="submitForm">
        <div class="card-block">
          <div class="row">
            <div class="col-lg-12">
              <div v-if="passwordInvalid" class="row">
                <Alert
                  class="alert alert-danger alert-fill alert-close alert-dismissible fade show"
                >
                  <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
                </Alert>
              </div>
            </div>
          </div>
          <h5 class="with-border m-t-lg">Detalhes Pessoais</h5>
          <div v-if="user" class="row">
            <div class="col-lg-6">
              <fieldset class="form-group">
                <label class="form-label" for="name">Nome</label>
                <input
                  type="text"
                  v-model="user.name"
                  class="form-control maxlength-simple"
                  placeholder="Seu Nome"
                >
              </fieldset>
            </div>
          </div>
          <h5 class="with-border m-t-lg">E-mail e Senha</h5>
          <div v-if="user" class="row">
            <div class="col-md-6 col-sm-6">
              <fieldset class="form-group">
                <label class="form-label" for="email">E-mail</label>
                <input
                  type="email"
                  v-model="user.email"
                  disabled
                  class="form-control maxlength-custom-message"
                  placeholder="Seu Email"
                >
              </fieldset>
            </div>
            <div class="col-md-4 col-sm-6">
              <div class="form-group">
                <label class="form-label" for="hide-show-password">Senha</label>
                <input
                  type="password"
                  v-model="password"
                  id="hide-show-password"
                  class="form-control"
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 col-sm-6">
              <ButtonSubmit bntTitle="Salvar Alterações" :ok="ok" :btnDisabled="btnDisabled"/>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { notifyHelpers as notify } from "@/utils/notify-helpers";
import { handleStatus } from "@/utils/promise-helpers";
import { errorWithNotify } from "@/utils/array-helpers";
import { HttpServices as service } from "@/services/http-services";
import Alert from "@/components/layouts/Alert";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import Breadcrumb from "@/components/layouts/Breadcrumb";

export default {
  name: "AccountIndex",
  components: {
    Alert,
    ButtonSubmit,
    Breadcrumb
  },
  props: [],
  data() {
    return {
      ok: false,
      user: this.$store.getters.getUser,
      password: "",
      passwordInvalid: false,
      btnDisabled: false
    };
  },
  methods: {

    submitForm() {
      if (this.password) {
        if (tool.forcePassword(this.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      this.btnDisabled = true;

      service
        .put(`/admin/users/${this.$store.getters.getUserId}`, {
          name: this.user.name,
          password: this.password,
          password_confirmation: this.password
        })
        .then(handleStatus)
        .then(res => {
          let stateUser = this.$store.getters.getUser;
          stateUser.name = this.user.name;

          sessionStorage.setItem("user", JSON.stringify(stateUser));

          this.btnDisabled = false;
          this.passwordInvalid = false;
          this.password = "";
          this.ok = true;

          this.users = res.data;
          this.total = res.data.total;

          notify.success("Sucesso!", "Dados do usuário alterados com sucesso.");
        })
        .catch(error => {
          this.btnDisabled = false;
          this.passwordInvalid = false;
          this.password = "";
          if ("data" in error.response) {
            errorWithNotify(error.response.data.error);
          }

          console.log(error.response);
        });
    }
  }
};
</script>
