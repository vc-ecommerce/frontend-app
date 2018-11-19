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
        <router-link :to="{ name: 'auth.reset' }">Recuperar Senha</router-link>
      </div>
    </div>

    <button type="submit" class="btn btn-rounded" :disabled="btnDisabled">
      <span v-if="btnDisabled">Enviando...</span>
      <span v-else>Efetuar Login</span>
    </button>

  </form>
</template>
<script>
import { JQueryPageCenter } from "@/commons/jquery-page-center";
import {
  notifySuccess,
  notifyWarning,
  notifyInfo,
  notifyDanger
} from "@/helpers/notifications";
import { validateEmail } from "@/helpers/validates";

export default {
  name: "Login",
  props: [],
  data() {
    return {
      email: "",
      password: "",
      btnDisabled: false
    };
  },
  beforeCreate() {
    document.addEventListener("DOMContentLoaded", () => {
      document.title = "Login";
    });
    this.$eventHub.$emit("eventPublic", true);
  },
  methods: {
    submitForm() {
      if (!validateEmail(this.email)) {
        notifyInfo("Atenção!", "Informe um email válido.");
        return;
      }

      this.btnDisabled = true;
      const api = `${this.$urlApi}/auth/login`;
      Vue.axios
        .post(api, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          notifySuccess("Redirecionando!", "Aguarde carregando dados.");

          sessionStorage.setItem(
            "token",
            JSON.stringify(response.data.HTTP_Authorization)
          );
          sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.HTTP_Data)
          );

          this.$store.commit("setUser", response.data);
          this.$store.commit("setToken", response.data.HTTP_Authorization);

          let redirect = localStorage.getItem("httpReferer")
            ? localStorage.getItem("httpReferer")
            : "/";

          setTimeout(() => {
            window.location = redirect;
          }, 2000);
        })
        .catch(error => {
          this.btnDisabled = false;
          this.password = "";
          let errors = error.response.data.error;

          if (errors == "account_inactive") {
            notifyWarning("Erro!", "Você ainda não confirmou seu email.");
          } else if (errors == "invalid_credentials") {
            notifyWarning("Erro!", "Email e ou senha inválidos.");
          } else {
            errors = Array(JSON.parse(errors));
            errors.forEach(value => {
              let values = Object.values(value);
              values.forEach(value => {
                notifyDanger("Atenção!", value);
              });
            });
          }
        });
    }
  },
  mounted() {
    if (sessionStorage.getItem("desconected")) {
      notifySuccess("Sucesso!", "Você foi desconectado com segurança.");
    }
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
    this.email = "";
    this.password = "";
    JQueryPageCenter();
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}

@keyframes treme {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 5px;
  }
  50% {
    margin-left: 0;
  }
  75% {
    margin-left: -5px;
  }
  100% {
    margin-left: 0;
  }
}

.red {
  color: #fa424a;
}

.green {
  color: #46c35f;
}

.gray {
  color: #808080;
}
</style>
