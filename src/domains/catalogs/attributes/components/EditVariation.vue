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
      modalTitle="Editar variação de atributo"
      :targetClass="`edit-modal-lg-${randId}`"
    >
      <AlertDivs :status="status" :error="error"/>

      <form id="edit-variation" @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Nome da variação do atributo</label>
              <input
                v-if="$store.getters.getItem"
                type="text"
                required
                class="form-control"
                v-model="$store.getters.getItem.name"
                placeholder="Nome da variação do atributo"
              >
            </fieldset>
          </div>
        </div>
      </form>

      <span slot="btn">
        <ButtonSubmitModal
          :form="`edit-variation-${randId}`"
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
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import AlertDivs from "./AlertDivs";
import ModalButton from "@/components/modals/ModalButton";
import ModalLarge from "@/components/modals/ModalLarge";
import ButtonSubmitModal from "@/components/modals/ButtonSubmitModal";

export default {
  name: "EditRole",
  components: {
    Table,
    ModalButton,
    ModalLarge,
    ButtonSubmitModal,
    Alert,
    AlertDivs
  },
  props: ["dataVariations", "dataItem"],
  data() {
    return {
      variation: {
        name: ""
      },
      randId: "",
      status: false,
      error: false,
      showModal: false,
      timestamp: 8000,
      ok: false,
      btnDisabled: false
    };
  },
  computed: {
    random: () => tool.strRandom()
  },
  methods: {
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      this.status = "Enviando...";
      this.btnDisabled = true;

      const uri = `/admin/attributes/${this.$route.params.id}/variations/${
        data._id
      }`;

      service
        .put(uri, {
          name: data.name,
          default: false
        })
        .then(res => {
          this.error = false;
          this.variations = res.data;
          this.total = res.data.total;
          this.status = "Variação editada com sucesso!";
          this.ok = true;

          setTimeout(() => {
            this.ok = false;
            this.status = false;
          }, this.timestamp);
        })
        .catch(error => {
          if (error.response.data === "attribute_variation_is_exists") {
            this.error = `Variação ${data.name} já existe.`;
          }
          this.status = false;
          setTimeout(() => {
            this.error = false;
          }, this.timestamp);
          console.log(error.response);
        });

      this.btnDisabled = false;

      setTimeout(() => {
        this.error = false;
        this.status = false;
      }, 5000);
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
