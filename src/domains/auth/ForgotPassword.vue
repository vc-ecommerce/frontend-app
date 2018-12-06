<template>
  <form class="sign-box" @submit.prevent="submitForm">
    <header class="sign-title">Redefinir Senha</header>

    <header v-if="passwordNotEquals" class="sign-title red">
      <div
        class="alert alert-warning alert-icon alert-close alert-dismissible fade show"
        role="alert"
      >
        <i class="font-icon font-icon-warning"></i>
        Senhas não são iguais !
      </div>
    </header>

    <header v-else-if="passwordInvalid">
      <div
        class="alert alert-danger alert-fill alert-close alert-dismissible fade show __web-inspector-hide-shortcut__"
        role="alert"
      >
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
      </div>
    </header>

    <div class="form-group">
      <input
        type="password"
        @click="checkAlert"
        required
        minlength="6"
        class="form-control"
        v-model="password"
        placeholder="Nova senha"
      >
    </div>

    <div class="form-group">
      <input
        type="password"
        @click="checkAlert"
        required
        minlength="6"
        class="form-control"
        v-model="confirm"
        placeholder="confirm a senha"
      >
    </div>

    <ButtonSubmit
      bntTitle="Redefinir senha agora"
      :ok="ok"
      :btnDisabled="btnDisabled"
      bntClass="btn btn-rounded"
    />
  </form>
</template>
<script>
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { domHelpers as dom } from "@/utils/dom-helpers";
import { notifyHelpers as notify } from "@/utils/notify-helpers";
import { handleStatus } from "@/utils/promise-helpers";
import { htmlPageCenter } from "@/utils/jquery-helpers";
import { HttpServices as service } from "@/services/http-services";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";

export default {
  name: "ForgotPassword",
  props: [],
  components: {
    ButtonSubmit
  },
  data() {
    return {
      ok: false,
      password: "",
      confirm: "",
      passwordNotEquals: false,
      passwordInvalid: false,
      userId: "",
      token: this.$route.params.token,
      btnDisabled: false
    };
  },
  created() {
    this.checkToken();
    htmlPageCenter();
    dom.createTitle("Redefinir Senha");
  },
  methods: {
    checkAlert() {
      if (this.passwordInvalid === true) {
        this.passwordInvalid = false;
        this.btnDisabled = false;
      }
    },
    isPasswordValid() {
      if (this.password !== this.confirm) {
        this.passwordNotEquals = true;
        setTimeout(() => {
          this.passwordNotEquals = false;
        }, 6000);
        return false;
      }
      return true;
    },
    checkToken(disabledNotify) {
      const vm = this;

      service
        .post("/auth/forgot/check/token", {
          token: this.token
        })
        .then(handleStatus)
        .then(res => {
          if (disabledNotify !== false) {
            notify.success("Verificação!", "Aceito, token válido.");
          }
          this.userId = res.data;
        })
        .catch(error => {
          swal(
            {
              title: "Token inválido ou expirado!!!",
              text: "Deseja gerar um novo token?",
              type: "warning",
              showCancelButton: true,
              confirmButtonClass: "btn-danger",
              confirmButtonText: "Sim",
              cancelButtonText: "Não",
              closeOnConfirm: false
            },
            function() {
              return (window.location.href = "/password/reset");
            }
          );
          console.log(error.response);
        });
    },
    sendData() {
      this.checkToken(false);
      this.btnDisabled = true;

      service
        .put("/auth/forgot", {
          user_id: this.userId,
          token: this.token,
          password: this.password
        })
        .then(handleStatus)
        .then(res => {
          this.ok = true;
          this.password = "";
          this.confirm = "";

          swal(
            {
              title: "Senha alterada com sucesso!",
              text: "Deseja efetuar login?",
              type: "success",
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Sim",
              cancelButtonText: "Não",
              closeOnConfirm: false
            },
            function() {
              return (window.location.href = "/login");
            }
          );
        })
        .catch(error => {
          console.log(error.response);
        });
      this.btnDisabled = false;
    },
    submitForm() {
      if (!this.isPasswordValid()) {
        return;
      }

      if (tool.forcePassword(this.password) < 50) {
        this.passwordInvalid = true;
        return;
      }

      if (this.userId !== "") {
        this.sendData();
      }
    }
  }
};
</script>

<style scoped>
.sign-title {
  font-weight: bold;
}

.red {
  color: #fa424a;
}

.sign-box a {
  text-decoration: none;
  color: #f3ecca;
  border-bottom: solid 1px transparent;
}
</style>
