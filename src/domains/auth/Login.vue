<template>
  <form class="sign-box" @submit.prevent="submitForm">
    <div class="sign-avatar">
      <img src="@/assets/img/avatar-sign.png" alt>
    </div>

    <header class="sign-title">Login</header>

    <div class="form-group">
      <input
        type="email"
        required
        class="form-control"
        v-model="email"
        placeholder="Entre com seu email"
      >
    </div>

    <div class="form-group">
      <input
        type="password"
        required
        minlength="6"
        class="form-control"
        v-model="password"
        placeholder="Digite a senha"
      >
    </div>

    <div class="form-group">
      <!-- <div class="checkbox float-left">
          <input type="checkbox" id="signed-in"/>
          <label for="signed-in">Mantenha-me conectado</label>
      </div>-->
      <div class="float-right reset">
        <router-link
          :to="{ name: 'auth.reset' }"
          @click.native="$eventHub.$emit('eventDocumentTitle', {data: 'Redefinição de senha'})"
        >
          Recuperar
          Senha
        </router-link>
      </div>
    </div>

    <ButtonSubmit
      bntTitle="Efetuar Login"
      :ok="ok"
      :btnDisabled="btnDisabled"
      bntClass="btn btn-rounded"
    />
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
  created() {
    if (sessionStorage.getItem("desconected")) {
      // Remove all saved data from sessionStorage
      sessionStorage.clear();
      this.email = "";
      this.password = "";
      notify.success("Sucesso!", "Você foi desconectado com segurança.");
    }
    htmlPageCenter();
    dom.createTitle("Fazer Login");
  },
  methods: {
    submitForm() {
      if (!validate.isEmail(this.email)) {
        notify.info("Atenção!", "Informe um email válido.");
        return;
      }

      this.btnDisabled = true;
      const vm = this;

      service
        .post("/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(handleStatus)
        .then(res => {
          sessionStorage.setItem(
            "token",
            JSON.stringify(res.data.HTTP_Authorization)
          );

          sessionStorage.setItem("user", JSON.stringify(res.data.HTTP_Data));

          const pathnameReferer = localStorage.getItem("pathnameReferer")
            ? localStorage.getItem("pathnameReferer")
            : "/";

          notify.success("Redirecionando!", "Aguarde carregando dados.");

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
        })
        .catch(error => {
          this.password = "";

          if ("data" in error.response) {
            let errors = error.response.data.error;

            if (errors.data === "account_inactive") {
              notify.warning("Erro!", "Você ainda não confirmou seu email.");
            } else if (errors.data === "invalid_credentials") {
              notify.warning("Erro!", "Email e ou senha inválidos.");
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
