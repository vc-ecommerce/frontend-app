<template>
  <form class="sign-box" @submit.prevent="submitForm">

    <header class="sign-title">Redefinir Senha</header>

    <header v-if="passwordNotEquals" class="sign-title red">
      <div class="alert alert-warning alert-icon alert-close alert-dismissible fade show" role="alert">
        <i class="font-icon font-icon-warning"></i>
        Senhas não são iguais !
      </div>
    </header>

    <header v-else-if="passwordInvalid">
      <div class="alert alert-danger alert-fill alert-close alert-dismissible fade show __web-inspector-hide-shortcut__" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
      </div>
    </header>

    <div class="form-group">
      <input type="password" @click="checkAlert" required minlength="6" class="form-control" v-model="password"  placeholder="Nova senha"/>
    </div>

    <div class="form-group">
      <input type="password" @click="checkAlert" required minlength="6" class="form-control" v-model="confirme"  placeholder="Confirme a senha"/>
    </div>
    <ButtonSubmit
      bntTitle="Redefinir senha agora"
      :ok="ok"
      :btnDisabled="btnDisabled"
      bntClass="btn btn-rounded" />

  </form>
</template>
<script>
import ToolsHelper from "@/helpers/ToolsHelper";
import JQueryHelper from "@/helpers/JQueryHelper";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";
import DocumentFactory from "@/factory/DocumentFactory";
import NotifyHelper from "@/helpers/NotifyHelper";
import AxiosService from "@/services/AxiosService";

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
      confirme: "",
      passwordNotEquals: false,
      passwordInvalid: false,
      userId: "",
      token: this.$route.params.token,
      btnDisabled: false
    };
  },
  created() {
    this.checkToken();
  },
  methods: {
    checkAlert() {
      if (this.passwordInvalid === true) {
        this.passwordInvalid = false;
        this.btnDisabled = false;
      }
    },
    isPasswordValid() {
      if (this.password !== this.confirme) {
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

      AxiosService.post("/auth/forgot/check/token", {
        token: this.token
      })
        .then(response => {
          if (response.data) {
            if (disabledNotify !== false) {
              NotifyHelper.success("Verificação!", "Aceito, token válido.");
            }
            this.userId = response.data;
          }
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
        });
    },
    sendData() {
      this.checkToken(false);
      this.btnDisabled = true;

      let promise = AxiosService.put("/auth/forgot", {
        user_id: this.userId,
        token: this.token,
        password: this.password
      });

      promise
        .then(response => {
          this.btnDisabled = false;
          this.ok = true;
          if (response.data === "update_password") {
            this.password = "";
            this.confirme = "";
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
          }
        })
        .catch(error => {
          this.btnDisabled = false;
          console.log(error.response);
        });
    },
    submitForm() {
      if (!this.isPasswordValid()) {
        return;
      }

      if (ToolsHelper.forcePassword(this.password) < 50) {
        this.passwordInvalid = true;
        return;
      }

      if (this.userId !== "") {
        this.sendData();
      }
    }
  },
  mounted() {
    DocumentFactory.createTitle("Redefinir Senha");
    JQueryHelper.pageCenter();
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
