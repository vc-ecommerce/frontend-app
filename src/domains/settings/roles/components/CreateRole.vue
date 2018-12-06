<template>
  <span>
    <ModalButton
      btnClass="btn btn-inline"
      iconClass="glyphicon glyphicon-plus"
      btnTitle="Criar Role"
    />

    <ModalLarge v-if="showModal" modalTitle="Criar nova função">
      <AlertDivs :status="status" :error="error"/>

      <form id="add-role" @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="role">Role Description</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="role.description"
                placeholder="Description"
              >
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="role.name"
                placeholder="Example: STAFF_COMMERCIAL"
              >
            </fieldset>
          </div>
        </div>

        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Privilégios</label>
        </div>

        <div class="row">
          <div
            class="checkbox-toggle"
            v-for="(privilege, index) in dataPrivileges"
            :key="index"
            style="margin-left:20px"
          >
            <span :class="index = index + random"></span>
            <input
              type="checkbox"
              v-model="role.privileges"
              :id="`check-toggle-${index}`"
              :value="privilege"
            >
            <label :for="`check-toggle-${index}`">{{ privilege.description }}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <ButtonSubmitModal
          form="add-role"
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
import ModalLarge from "@/components/modals/ModalLarge";
import ModalButton from "@/components/modals/ModalButton";
import ButtonSubmitModal from "@/components/modals/ButtonSubmitModal";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsSelectTrueOrFalse } from "@/utils/array-helpers";
import AlertDivs from "./AlertDivs";

export default {
  name: "CreateRole",
  components: {
    Table,
    ModalLarge,
    ModalButton,
    ButtonSubmitModal,
    AlertDivs
  },
  props: ["dataPrivileges"],
  data() {
    return {
      role: {
        name: "",
        description: "",
        privileges: []
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
    submitForm() {
      this.status = "Enviando...";
      this.btnDisabled = true;

      service
        .post(`/admin/roles`, {
          name: this.role.name.toUpperCase(),
          description: this.role.description,
          privileges: this.role.privileges,
          default: false,
          action: "create-role"
        })
        .then(res => {
          this.roles = res.data;
          this.total = res.data.total;
          this.status = "Função criada com sucesso!";
          this.role.name = "";
          this.role.description = "";
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
            this.showModal = false;
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
