<template>
  <span>
    <span :class="randId = random"></span>

    <ModalButton
      btnClass="tabledit-edit-button btn btn-sm btn-default"
      iconClass="glyphicon glyphicon-pencil"
      :targetClass="`.edit-modal-lg-${randId}`"
      :dataItem="dataItem"
    />

    <ModalLarge
      v-if="showModal"
      modalTitle="Editar dados de usuário"
      :targetClass="`edit-modal-lg-${randId}`"
    >
      <AlertDivs :status="status" :error="error" :passwordInvalid="passwordInvalid"/>

      <form :id="`edit-${randId}`" @submit.prevent="submitForm">
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
            <input type="checkbox" v-model="roleUser" :id="`check-toggle-${index}`" :value="role">
            <label :for="`check-toggle-${index}`">{{role.description}}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <ButtonSubmitModal
          :form="`edit-${randId}`"
          bntTitle="Salvar Alterações"
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
import AlertDivs from "./AlertDivs";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsSelectTrueOrFalse } from "@/utils/array-helpers";

export default {
  name: "EditUser",
  components: {
    Table,
    ModalLarge,
    ModalButton,
    ButtonSubmitModal,
    AlertDivs
  },
  props: ["dataItem", "dataRoles"],
  data() {
    return {
      password: "",
      options: optionsSelectTrueOrFalse(),
      randId: "",
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
    random: () => tool.strRandom(),
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
          }, this.timestamp);

          return;
        }
      }

      this.status = "Enviando...";
      this.btnDisabled = true;

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
          this.status = "Usuário alterado com sucesso!";
          this.ok = true;

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
