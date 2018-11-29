<template>
  <span>
    <ModalLink
      :idModalLink="$store.getters.getItem ? $store.getters.getItem._id : ''"
      showTypeClassName="tabledit-edit-button btn btn-sm btn-default"
      classIcon="glyphicon glyphicon-pencil"
      :dataItem="dataItem"
    />

    <Modal
      :idModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      titleModal="Editar dados de Usuário"
      sizeModal="lg"
    >
      <div v-if="passwordInvalid" class="row">
        <Alert class="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
        </Alert>
      </div>

      <span :class="formId = random"></span>

      <form :id="'edit-user-'+ formId" @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="inputName">Nome</label>
              <input
                v-if="$store.getters.getItem"
                type="text"
                required
                class="form-control"
                v-model="$store.getters.getItem.name"
                placeholder="Nome"
              >
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputEmail">Email</label>
              <input
                v-if="$store.getters.getItem"
                type="email"
                required
                class="form-control"
                placeholder="E-mail"
                v-model="$store.getters.getItem.email"
              >
            </fieldset>
          </div>
        </div>

        <!--.row-->
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label" for="inputPassword">Usuário ativo?</label>
              <select class="form-control" required v-model="selectedOption">
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
              <label class="form-label" for="inputPassword">Senha</label>
              <input
                type="password"
                class="form-control"
                minlength="6"
                v-model="password"
                placeholder="Senha"
              >
            </fieldset>
          </div>
        </div>

        <!--.row-->
        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Departamentos do usuário [Permissões]</label>
        </div>

        <div class="row">
          <div
            class="checkbox-toggle"
            v-for="(role, index) in dataRoles"
            :key="role.id"
            style="margin:20px"
          >
            <span :class="index = index + random"></span>
            <input type="checkbox" v-model="roleUser" :id="'check-toggle-'+ index" :value="role">
            <label :for="'check-toggle-'+ index">{{role.description}}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <button :form="'edit-user-'+ formId" type="submit" class="btn btn-rounded btn-primary">
          <i class="glyphicon glyphicon-ok"></i> Salvar Alterações
        </button>
      </span>
    </Modal>
  </span>
</template>
<script>
import Table from "@/components/layouts/Table";
import ModalLink from "@/components/modals/ModalLink";
import Modal from "@/components/modals/Modal";
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsTrueOrFalse, errorWithNotify } from "@/utils/array-helpers";
import { notifyHelpers as notify } from "@/utils/notify-helpers";

export default {
  name: "EditUser",
  components: {
    Table,
    Modal,
    ModalLink,
    Alert
  },
  props: ["dataItem", "dataRoles"],
  data() {
    return {
      formId: "",
      password: "",
      passwordInvalid: false,
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ]
    };
  },
  computed: {
    random: () => Math.floor(Math.random() * 1000000 + 1),
    roleUser: {
      get() {
        return tool.cleanRole(
          this.$store.getters.getItem ? this.$store.getters.getItem.roles : []
        );
      },
      set(value) {
        let item = this.$store.getters.getItem;
        item.roles = value;
        this.$store.commit("setItem", item);
      }
    },
    selectedOption: {
      get() {
        return Boolean(
          this.$store.getters.getItem
            ? this.$store.getters.getItem.active
            : false
        );
      },
      set(value) {
        let item = this.$store.getters.getItem;
        item.active = value;
        this.$store.commit("setItem", item);
      }
    }
  },
  methods: {
    cleanData(data) {
      return tool.cleanDataApi(data);
    },
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      if (this.password !== "") {
        if (tool.forcePassword(this.password) < 50) {
          this.passwordInvalid = true;

          setTimeout(() => {
            this.passwordInvalid = false;
          }, 5000);

          return;
        }
      }

      service
        .put(`/admin/users/${data._id}`, {
          name: data.name,
          email: data.email,
          active: data.active,
          action: "edit-user",
          password: this.password,
          password_confirmation: this.password,
          roles: data.roles
        })
        .then(res => {
          this.password = "";
          this.users = res.data;
          this.total = res.data.total;
          notify.success("Sucesso!", "Usuário alterado com sucesso.");
        })
        .catch(error => {
          if ("data" in error.response) {
            errorWithNotify(error.response.data.error);
          }
          console.log(error.response);
        });
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
