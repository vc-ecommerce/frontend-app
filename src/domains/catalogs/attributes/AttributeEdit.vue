<template>
  <div>
    <section>
      <LinkBreadcrumb :title="titlePage"/>
    </section>
    <Panel :title="titlePage" classContent="panel-body">
      <div class="row">
        <div class="col-sm-12">
          <AlertDivs :status="status" :error="error"/>
        </div>
      </div>

      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-sm-2">Nome do atributo</div>
          <div class="col-sm-10">
            <input
              type="text"
              required
              class="form-control"
              v-model="name"
              placeholder="Digite aqui"
            >
            <span>Nome do atributo para controle interno</span>
          </div>
        </div>

        <div class="row col-btn">
          <div class="col-sm-2"></div>
          <div class="col-sm-10 text-right">
            <ButtonSubmit
              v-if="!ok"
              bntTitle="Alterar nome"
              :ok="ok"
              :btnDisabled="btnDisabled"
              bntClass="btn btn-inline"
              iconClass="glyphicon glyphicon-ok"
            />
            <router-link v-else class="btn btn-inline" :to="{name: 'catalogs.attributes.list'}">
              <i class="glyphicon glyphicon-ok"></i> Concluído
            </router-link>
          </div>
        </div>
      </form>

      <AttributeVariation class="variation"/>
    </Panel>
  </div>
</template>
<script>
import Panel from "@/components/layouts/Panel";
import Alert from "@/components/layouts/Alert";
import AlertDivs from "./components/AlertDivs";
import AttributeVariation from "./components/AttributeVariation";
import { HttpServices as service } from "@/services/http-services";
import LinkBreadcrumb from "./components/LinkBreadcrumb";
import ButtonSubmit from "@/components/layouts/ButtonSubmit";

export default {
  name: "AttributeEdit",
  components: {
    Panel,
    Alert,
    AttributeVariation,
    AlertDivs,
    LinkBreadcrumb,
    ButtonSubmit
  },
  props: [],
  data() {
    return {
      name: "",
      status: false,
      error: false,
      btnDisabled: false,
      titlePage: "Editando Atributo",
      ok: false
    };
  },

  created() {

    if (sessionStorage.getItem("attributeCreated")) {
      this.status = sessionStorage.getItem("attributeCreated");
      sessionStorage.removeItem("attributeCreated");

      setTimeout(() => {
        this.status = false;
      }, 8000);
    }
  },
  methods: {
    getAttribute() {
      service
        .get(`/admin/attributes/${this.$route.params.id}`)
        .then(response => {
          this.name = response.data.name;
        })
        .catch(error => {
          this.error = JSON.parse(error.response.data.error);
        });
    },

    submitForm() {
      this.status = "Enviando...";
      this.btnDisabled = true;
      this.ok = false;
      service
        .put(`/admin/attributes/${this.$route.params.id}`, {
          name: this.name,
          default: false
        })
        .then(res => {
          this.ok = true;
          this.error = false;
          this.status = "Atributo alterado com sucesso.";
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);
        });
      this.btnDisabled = false;

      setTimeout(() => {
        this.status = false;
        this.error = false;
      }, 8000);
    }
  }
};
</script>
<style scoped>
.row {
  padding: 20px;
}
span {
  font-size: 12px;
  color: #999;
}
.col-btn {
  margin-top: -20px;
}

.variation {
  border-top: 1px solid #ece9e9;
}
</style>
