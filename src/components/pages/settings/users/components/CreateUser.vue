<template>
  <span>
    <ModalLink idModalLink="create-user" titleLink="Criar" classIcon="glyphicon glyphicon-plus"/>

    <Modal idModal="create-user" titleModal="Criar novo usuário" sizeModal="lg">
      <div v-if="passwordInvalid" class="row">
        <Alert class="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
        </Alert>
      </div>

      <form id="add-user" @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="inputName">Nome</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="user.name"
                placeholder="Nome"
              >
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputEmail">Email</label>
              <input
                type="email"
                required
                class="form-control"
                placeholder="E-mail"
                v-model="user.email"
              >
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputPassword">Usuário ativo?</label>
              <select required class="form-control" v-model="user.active">
                <option disabled value>Escolha um item</option>
                <option
                  v-for="option in options"
                  :key="option.id"
                  :value="option.value"
                >{{ option.text }}</option>
              </select>
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="hide-show-password">Senha</label>
              <input
                type="password"
                id="hide-show-password"
                required
                class="form-control"
                minlength="6"
                v-model="user.password"
                placeholder="Senha"
              >
            </fieldset>
          </div>
        </div>
        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Departamentos do usuário [Permissões]</label>
        </div>

        <div class="row">
          <div
            class="checkbox-toggle"
            v-for="(role, index) in dataRoles"
            :key="role.id"
            style="margin-left:20px"
          >
            <span :class="index = index + random"></span>
            <input type="checkbox" v-model="user.roles" :id="'check-toggle-'+ index" :value="role">
            <label :for="'check-toggle-'+ index">{{role.description}}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <button form="add-user" type="submit" class="btn btn-rounded btn-primary">
          <i class="glyphicon glyphicon-ok"></i> Salvar Dados
        </button>
      </span>
    </Modal>
  </span>
</template>
<script>
import Table from "@/components/layouts/Table";
import Modal from "@/components/modals/Modal";
import ModalLink from "@/components/modals/ModalLink";
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsTrueOrFalse, errorWithNotify } from "@/utils/array-helpers";
import { notifyHelpers as notify } from "@/utils/notify-helpers";

export default {
  name: "CreateUser",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataRoles"],
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        active: "",
        roles: []
      },
      passwordInvalid: false,
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ]
    };
  },
  computed: {    
    random: () => tool.strRandom()
  },
  methods: {
    cleanData(data) {
      return tool.cleanDataApi(data);
    },
    submitForm() {
      if (this.user.password !== "") {
        if (tool.forcePassword(this.user.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      service
        .post("/admin/users", {
          name: this.user.name,
          email: this.user.email,
          active: this.user.active,
          password: this.user.password,
          password_confirmation: this.user.password,
          roles: this.user.roles,
          action: "create-user"
        })
        .then(res => {
          this.users = res.data;
          this.total = res.data.total;
          notify.success("Sucesso!", "Dados cadastrados com sucesso.");
          this.$emit("reload");
        })
        .catch(error => {
          if ("data" in error.response) {
            errorWithNotify(error.response.data.error);
          }
          console.log(error.response);
        });
    }
  },
  mounted() {
    console.log();
  }
};
</script>

<style scoped>
.row,
.col-lg-6 {
  text-align: left;
}
</style>
