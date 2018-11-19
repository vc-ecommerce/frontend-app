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

    <button type="submit" class="btn btn-rounded" :disabled="btnDisabled">
      <span v-if="btnDisabled">Enviando...</span>
      <span v-else>Enviar</span>
    </button>

  </form>
</template>
<script>
import { cleanDataApi } from "@/helpers/tools";
import { validateEmail } from "@/helpers/validates";
import { JQueryPageCenter } from "@/commons/jquery-page-center";
import {
  notifySuccess,
  notifyWarning,
  notifyInfo,
  notifyDanger
} from "@/helpers/notifications";

export default {
  name: "ResetPassword",
  props: [],
  data() {
    return {
      email: "",
      btnDisabled: false
    };
  },
  beforeCreate() {
    document.addEventListener("DOMContentLoaded", () => {
      document.title = "Redefinição de Senha";
    });
    this.$eventHub.$emit("eventPublic", true);
  },
  mounted() {
    JQueryPageCenter();
  },
  methods: {
    cleanData(data) {
      return cleanDataApi(data);
    },
    submitForm() {
      if (!validateEmail(this.email)) {
        notifyInfo("Atenção!", "Informe um email válido.");
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
        })
        .catch(error => {
          this.btnDisabled = false;

          if (error.response.status === 404) {
            return notifyDanger("Atenção!", "Email não encontrado.");
          } else {
            let errors = Array(JSON.parse(error.response.data.error));
            errors.forEach(value => {
              let values = Object.values(value);
              values.forEach(value => {
                notifyDanger("Atenção!", value);
              });
            })
          }
        });
    }
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}

.showError {
  animation: treme 0.1s;
  animation-iteration-count: 3;
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
