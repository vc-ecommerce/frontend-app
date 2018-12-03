<template>
  <Panel title="Criando Atributo" classContent="panel-body">
     <div class="row">
      <div class="col-sm-12">
        <AlertDivs :status="status" :error="error"/>
      </div>
    </div>

    <form id="add-user" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-sm-2">Nome do atributo</div>
        <div class="col-sm-10">
          <input type="text" required class="form-control" v-model="name" placeholder="Digite aqui">
          <span>Nome do atributo para controle interno</span>
        </div>
      </div>

      <div class="row col-btn">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Criar atributo
          </button>
          <router-link
            :to="{ name: 'catalogs.attributes.list' }"
            class="btn btn-inline btn-sm btn-default"
          >
            <i class="glyphicon glyphicon-remove"></i> Cancelar
          </router-link>
        </div>
      </div>
    </form>
  </Panel>
</template>
<script>
import Panel from "@/components/layouts/Panel";
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import AlertDivs from "./components/AlertDivs";
import { isAclToPage } from "@/utils/authorizations-helpers";

export default {
  name: "AttributeCreate",
  components: {
    Panel,
    Alert,
    AlertDivs
  },
  props: [],
  data() {
    return {
      name: "",
      status: false,
      error: false,
      btnDisabled: false
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR");
  },
  methods: {
    submitForm() {
      this.status = "Enviando...";

      this.btnDisabled = true;

      service
        .post("/admin/attributes", {
          name: this.name,
          default: false
        })
        .then(res => {
          this.error = false;
          let data = res.data;
          if (data._id) {
            sessionStorage.setItem(
              "attributeCreated",
              "Atributo criado com sucesso!"
            );
            this.$router.push({
              name: "catalogs.attributes.edit",
              params: { id: data._id }
            });
          }

          this.name = "";
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);
          setTimeout(() => {
            this.error = false;
          }, 5000);
        });

      this.btnDisabled = false;
    }
  }
};
</script>
<style scoped>
.row {
  padding: 20px;
}
.col-btn {
  margin-top: -20px;
}
span {
  font-size: 12px;
  color: #999;
}
</style>
