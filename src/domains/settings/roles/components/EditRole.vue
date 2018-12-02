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
      modalTitle="Editar dados de função"
      :targetClass="`edit-modal-lg-${randId}`"
    >
      <AlertDivs :status="status" :error="error"/>

      <form :id="`edit-${randId}`" @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="role">Role Description</label>
              <input
                v-if="$store.getters.getItem"
                type="text"
                required
                class="form-control"
                v-model="$store.getters.getItem.description"
                placeholder="Description"
              >
            </fieldset>
          </div>
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-if="$store.getters.getItem"
                type="text"
                required
                class="form-control"
                v-model="$store.getters.getItem.name"
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
              v-model="privilegeRole"
              :id="`check-toggle-${index}`"
              :value="privilege"
            >
            <label :for="`check-toggle-${index}`">{{ privilege.description }}</label>
          </div>
        </div>
      </form>

      <span slot="btn">
        <button :form="`edit-${randId}`" type="submit" class="btn btn-rounded btn-primary">
          <i class="glyphicon glyphicon-ok"></i> Salvar Alterações
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
import AlertDivs from "./AlertDivs";

export default {
  name: "EditRole",
  components: {
    Table,
    ModalLarge,
    ModalButton,
    AlertDivs
  },
  props: ["dataPrivilegies", "dataItem"],
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
      randId: "",
      status: false,
      error: false,
      passwordInvalid: false,
      showModal: false,
      timestamp: 8000
    };
  },
  computed: {
    random: () => tool.strRandom(),

    privilegeRole: {
      get() {
        return this.$store.getters.getItem
          ? this.$store.getters.getItem.privileges
          : [];
      },
      set(value) {
        let item = this.$store.getters.getItem;
        item.privileges = value;
        this.$store.commit("setItem", item);
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      this.status = "Enviando...";

      service
        .put(`/admin/roles/${data._id}`, {
          name: data.name.toUpperCase(),
          description: data.description,
          privileges: data.privileges,
          default: false,
          action: "edit-role"
        })
        .then(res => {
          this.roles = res.data;
          this.total = res.data.total;
          this.status = "Função editada com sucesso!";

          setTimeout(() => {
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
