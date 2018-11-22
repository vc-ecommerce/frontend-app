<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <div class="sign-avatar">
      <img src="@/assets/img/avatar-sign.png" alt="">
    </div>

    <header class="sign-title">Login</header>

    <div class="form-group">
      <input type="email" required class="form-control" v-model="email" placeholder="Entre com seu email"/>
    </div>

    <div class="form-group">
      <input type="password" required minlength="6" class="form-control" v-model="password"  placeholder="Digite a senha"/>
    </div>

    <div class="form-group">
      <!-- <div class="checkbox float-left">
          <input type="checkbox" id="signed-in"/>
          <label for="signed-in">Mantenha-me conectado</label>
      </div> -->
      <div class="float-right reset">
        <router-link :to="{ name: 'auth.reset' }" @click.native="$eventHub.$emit('eventDocumentTitle', {data: 'Redefinição de senha'})">Recuperar Senha</router-link>
      </div>
    </div>

    <ButtonSubmit
        bntTitle="Efetuar Login"
        :ok="ok"
        :btnDisabled="btnDisabled"
        bntClass="btn btn-rounded"  />

  </form>
</template>
<script>
import JQueryHelper from "@/helpers/JQueryHelper";
import ValidatesHelper from "@/helpers/ValidatesHelper";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import DocumentFactory from "@/factory/DocumentFactory";
import NotifyHelper from "@/helpers/NotifyHelper";
import AxiosService from "@/services/AxiosService";

export default {
  name: "Login",
  props: [],
  components: {
    ButtonSubmit
  },
  data() {
    return {
      ok: false,
      email: "",
      password: "",
      btnDisabled: false,
      redirectPathForIndex: ["password", "login", "static"]
    };
  },
  methods: {
    submitForm() {
      if (!ValidatesHelper.validateEmail(this.email)) {
        NotifyHelper.info("Atenção!", "Informe um email válido.");
        return;
      }

      this.btnDisabled = true;
      const vm = this;

      let promise = AxiosService.post("/auth/login", {
        email: this.email,
        password: this.password
      });

      promise
        .then(response => {

          if (response.status === 200) {

            sessionStorage.setItem(
              "token",
              JSON.stringify(response.data.HTTP_Authorization)
            );

            sessionStorage.setItem(
              "user",
              JSON.stringify(response.data.HTTP_Data)
            );

            const pathnameReferer = localStorage.getItem("pathnameReferer")
              ? localStorage.getItem("pathnameReferer")
              : "/";

            NotifyHelper.success("Redirecionando!", "Aguarde carregando dados.");

            setTimeout(() => {
              if (
                vm.redirectPathForIndex.includes(pathnameReferer.substring(1))
              ) {
                return window.location.replace("/");
              }

              return window.location.replace(
                pathnameReferer ? pathnameReferer : "/"
              );
            }, 1000);

          }

        })
        .catch(error => {
          this.btnDisabled = false;
          this.password = "";
          let errors = error.response.data.error;

          if (errors == "account_inactive") {
            NotifyHelper.warning(
              "Erro!",
              "Você ainda não confirmou seu email."
            );
          } else if (errors == "invalid_credentials") {
            NotifyHelper.warning("Erro!", "Email e ou senha inválidos.");
          } else {
            Array(JSON.parse(errors)).forEach(value => {
              Object.values(value).forEach(value => {
                NotifyHelper.danger("Atenção!", value);
              });
            });
          }

          console.log(error.response);
        });
    }
  },
  mounted() {
    DocumentFactory.createTitle("Fazer Login");

    if (sessionStorage.getItem("desconected")) {
      NotifyHelper.success("Sucesso!", "Você foi desconectado com segurança.");
    }
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
    this.email = "";
    this.password = "";
    JQueryHelper.pageCenter();
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}
</style>
