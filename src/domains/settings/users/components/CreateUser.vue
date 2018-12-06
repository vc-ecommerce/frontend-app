<template>
  <span>
    <ModalButton btnClass="btn btn-inline" iconClass="glyphicon glyphicon-plus" btnTitle="Criar"/>

    <ModalLarge v-if="showModal" modalTitle="Criar novo usuário">
      <AlertDivs :status="status" :error="error" :passwordInvalid="passwordInvalid"/>

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
        <ButtonSubmitModal
          form="add-user"
          bntTitle="Salvar Dados"
          :ok="ok"
          :btnDisabled="btnDisabled"
          bntClass="btn btn-rounded btn-primary"
        />
      </span>
    </ModalLarge>
  </span>
</template>
<script>
import Table from "@/components/layouts/Table";
import ModalButton from "@/components/modals/ModalButton";
import ModalLarge from "@/components/modals/ModalLarge";
import ButtonSubmitModal from "@/components/modals/ButtonSubmitModal";
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import AlertDivs from "./AlertDivs";
import { optionsSelectTrueOrFalse } from "@/utils/array-helpers";

export default {
  name: "CreateUser",
  components: {
    Table,
    ModalButton,
    ModalLarge,
    ButtonSubmitModal,
    Alert,
    AlertDivs
  },
  props: ["dataRoles"],
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        active: true,
        roles: []
      },
      options: optionsSelectTrueOrFalse(),
      status: false,
      error: false,
      passwordInvalid: false,
      showModal: false,
      timestamp: 8000,
      ok: false,
      btnDisabled: false
    };
  },
  computed: {
    random: () => tool.strRandom()
  },
  mounted() {
    this.$eventHub.$on("showModal", obj => {
      this.status = false;
      this.error = false;
      this.showModal = obj;
      this.ok = false;
    });
  },
  beforeDestroy() {
    this.$eventHub.$off("showModal", obj => {
      this.status = false;
      this.error = false;
      this.showModal = obj;
      this.ok = false;
    });
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
          }, this.timestamp);

          return;
        }
      }

      this.status = "Enviando...";
      this.btnDisabled = true;

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
          this.status = "Dados cadastrados com sucesso.";
          this.ok = true;
          this.user.name = "";
          this.user.email = "";
          this.user.password = "";
          this.user.active = "";
          setTimeout(() => {
            this.ok = false;
            this.status = false;
          }, this.timestamp);
        })
        .catch(error => {
          this.error = JSON.parse(error.response.data.error);
          this.status = false;
          setTimeout(() => {
            this.error = false;
          }, this.timestamp);

          console.log(error.response);
        });
      this.btnDisabled = false;
    }
  }
};
</script>

<style scoped>
.row,
.col-lg-6 {
  text-align: left;
}
</style>
