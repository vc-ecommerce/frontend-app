<template>
  <span>
    <!-- <ModalButton
      btnClass="btn btn-inline"
      iconClass="glyphicon glyphicon-plus"
      btnTitle="Criar"
      data-item="dataPrivilegies"
    />-->
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
            v-for="(privilege, index) in dataPrivilegies"
            :key="index"
            style="margin-left:20px"
          >
            <span :class="index = index + random"></span>
            <input
              type="checkbox"
              v-model="role.privileges"
              :id="'check-toggle-'+ index"
              :value="privilege"
            >
            <label :for="'check-toggle-'+ index">{{ privilege.description }}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <button form="add-role" type="submit" class="btn btn-rounded btn-primary">
          <i class="glyphicon glyphicon-ok"></i> Salvar Dados
        </button>
      </span>
    </ModalLarge>
  </span>
</template>
<script>
import Table from "@/components/layouts/Table";
import ModalLarge from "@/components/modals/ModalLarge";
import ModalButton from "@/components/modals/ModalButton";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsTrueOrFalse } from "@/utils/array-helpers";
import AlertDivs from "./AlertDivs";

export default {
  name: "CreateRole",
  components: {
    Table,
    ModalLarge,
    ModalButton,
    AlertDivs
  },
  props: ["dataPrivilegies"],
  data() {
    return {
      role: {
        name: "",
        description: "",
        privileges: []
      },
      options: [
        { text: "Ativo", value: true },
        { text: "Desativado", value: false }
      ],
      status: false,
      error: false,
      passwordInvalid: false,
      showModal: false,
      timestamp: 8000
    };
  },
  computed: {
    random: () => tool.strRandom()
  },
  methods: {
    submitForm() {
      this.status = "Enviando...";

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

          setTimeout(() => {
            this.role = [];
            this.status = false;
          }, this.timestamp);
        })
        .catch(error => {
          this.error = JSON.parse(error.response.data.error);

          setTimeout(() => {
            this.status = false;
            this.error = false;
          }, this.timestamp);
        });
    }
  },
  mounted() {
    this.$eventHub.$on("showModal", obj => (this.showModal = obj));
  },
  beforeDestroy() {
    this.$eventHub.$off("showModal", obj => (this.showModal = obj));
  }
};
</script>

<style scoped>
.row,
.col-lg-6 {
  text-align: left;
}
</style>
