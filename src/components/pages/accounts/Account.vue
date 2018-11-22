<template>
  <form @submit.prevent="submitForm">
    <section class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-lg-12">
            <div v-if="passwordInvalid" class="row">
              <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
                <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
              </Alert>
            </div>
          </div>
        </div>
        <h5 class="with-border m-t-lg">Detalhes Pessoais</h5>
        <div v-if="user" class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInput">Nome</label>
              <input type="text" v-model="user.name" class="form-control maxlength-simple" placeholder="Seu Nome" >
            </fieldset>
          </div>
        </div>
        <h5 class="with-border m-t-lg">E-mail e Senha</h5>
        <div v-if="user" class="row">
          <div class="col-md-6 col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInputEmail1">E-mail</label>
              <input type="email" v-model="user.email" disabled class="form-control maxlength-custom-message" placeholder="Seu Email">
            </fieldset>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="form-group">
              <label class="form-label" for="hide-show-password">Senha</label>
              <input type="password" v-model="password" id="hide-show-password" class="form-control">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-sm-6">

            <ButtonSubmit
              bntTitle="Salvar Alterações"
              :ok="ok"
              :btnDisabled="btnDisabled" />

          </div>
        </div>
      </div>
    </section>
  </form>
</template>
<script>
import Alert from "@/components/layouts/Alert";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import NotifyHelper from "@/helpers/NotifyHelper";
import ToolsHelper from "@/helpers/ToolsHelper";
import AxiosService from "@/services/AxiosService";

export default {
  name: "Account",
  components: {
    Alert,
    ButtonSubmit
  },
  props: [],
  data() {
    return {
      ok: false,
      user: this.$store.getters.getUser,
      password: "",
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      passwordInvalid: false,
      btnDisabled: false
    };
  },
  methods: {
    cleanData(data) {
      return ToolsHelper.cleanDataApi(data);
    },
    submitForm() {
      if (this.password !== "") {
        if (ToolsHelper.forcePassword(this.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      this.btnDisabled = true;

      const uri = `/admin/users/${this.$store.getters.getUserId}`;

      let promise = AxiosService.put(uri, {
        name: this.user.name,
        password: this.password,
        password_confirmation: this.password
      });

      promise
        .then(response => {
          let stateUser = this.$store.getters.getUser;
          stateUser.name = this.user.name;

          sessionStorage.setItem("user", JSON.stringify(stateUser));

          this.btnDisabled = false;
          this.passwordInvalid = false;
          this.password = "";
          this.ok = true;

          this.users = response.data;
          this.total = response.data.total;

          NotifyHelper.success(
            "Sucesso!",
            "Dados do usuário alterados com sucesso."
          );
        })
        .catch(error => {
          this.btnDisabled = false;

          this.passwordInvalid = false;
          this.password = "";

          Array(JSON.parse(error.response.data.error)).forEach(value => {
            Object.values(value).forEach(value => {
              NotifyHelper.danger("Atenção!", value);
            });
          });

          return Promise.reject(error);
        });
    }
  }
};
</script>
