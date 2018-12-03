<template>
  <Panel title="Editando Página" classContent="panel-body">
    <div class="row">
      <div class="col-sm-12">
        <AlertDivs :status="status" :error="error"/>
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-sm-2">Página ativa?</div>
        <div class="col-sm-4">
          <select class="form-control" required v-model="data.active">
            <option disabled value>Escolha um item</option>
            <option
              v-for="option in options"
              :key="option.id"
              :value="option.value"
            >{{ option.text }}</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">Título da página</div>
        <div class="col-sm-10">
          <input
            type="text"
            required
            class="form-control"
            v-model="data.name"
            placeholder="Digite aqui o título da página"
          >
          <span v-if="applySlug" class="control">{{ $urlSite +"/pg/"+ applySlug }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">Conteúdo da página</div>
        <div class="col-sm-10">
          <div class="form-group">
            <html-editor
              v-if="data.description"
              height="200"
              :dataDesc="data.description"
              :model.sync="data.description"
            ></html-editor>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <WidgetAccordion>
            <WidgetAccordionContent title="Otimização para buscadores (SEO)">
              <div class="row">
                <div class="col-sm-2">Tag Title</div>
                <div class="col-sm-9">
                  <div class="form-group">
                    <input class="form-control" v-model="data.meta_title">
                  </div>
                </div>
                <div class="col-sm-1">
                  <div class="form-group">
                    <a
                      href="https://static.googleusercontent.com/media/www.google.com/pt-BR//intl/pt-BR/webmasters/docs/guia-otimizacao-para-mecanismos-de-pesquisa-pt-br.pdf"
                      target="_blank"
                      class="label label-default"
                      data-toggle="tooltip"
                      title
                      data-original-title="Guia do Google para Iniciantes"
                    >
                      <i class="glyphicon glyphicon-question-sign"></i> Guia
                    </a>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-2">Meta Tag Description</div>
                <div class="col-sm-10">
                  <div class="form-group">
                    <textarea class="form-control" v-model="data.meta_description"></textarea>
                  </div>
                </div>
              </div>
            </WidgetAccordionContent>
          </WidgetAccordion>
        </div>
      </div>

      <div class="row col-btn">
        <div class="col-sm-12 text-right">
          <router-link
            :to="{ name: 'catalogs.pages.list' }"
            class="btn btn-inline btn-sm btn-default"
          >
            <i class="glyphicon glyphicon-remove"></i> Cancelar
          </router-link>
          <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
            <i class="glyphicon glyphicon-ok"></i> Salvar alterações
          </button>
        </div>
      </div>
    </form>
  </Panel>
</template>
<script>
import Panel from "@/components/layouts/Panel";
import Alert from "@/components/layouts/Alert";
import WidgetAccordion from "@/components/widgets/WidgetAccordion";
import WidgetAccordionContent from "@/components/widgets/WidgetAccordionContent";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import HtmlEditor from "@/components/summernote/HtmlEditor";
import { HttpServices as service } from "@/services/http-services";
import AlertDivs from "./components/AlertDivs";
import { isAclToPage } from "@/utils/authorizations-helpers";

export default {
  name: "PageEdit",
  components: {
    Panel,
    Alert,
    WidgetAccordion,
    WidgetAccordionContent,
    HtmlEditor,
    AlertDivs
  },
  props: [],
  data() {
    return {
      data: {},
      status: false,
      error: false,
      btnDisabled: false,
      options: [{ text: "Sim", value: true }, { text: "Não", value: false }]
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR");
  },
  computed: {
    applySlug() {
      return this.data.name ? tool.strSlug(this.data.name) : "";
    }
  },
  created() {
    this.getPage();
  },
  methods: {
    cleanData(data) {
      return tool.cleanDataApi(data);
    },
    getPage() {
      service
        .get(`/admin/pages/${this.$route.params.id}`)
        .then(res => {
          this.data = res.data;
        })
        .catch(error => {
          this.error = JSON.parse(error.response.data.error);
        });
    },

    submitForm() {
      this.status = "Enviando...";
      this.btnDisabled = true;

      service
        .put(`/admin/pages/${this.$route.params.id}`, {
          name: this.data.name,
          description: this.data.description,
          active: this.data.active,
          slug: tool.strSlug(this.data.name),
          meta_description: this.data.meta_description,
          meta_title: this.data.meta_title
        })
        .then(res => {
          this.error = false;
          this.status = false;

          if (res.data === true) {
            swal({
              title: "Dados atualizados!",
              text: "A página foi atualizada com sucesso.",
              type: "success",
              confirmButtonClass: "btn-success",
              confirmButtonText: "OK"
            });

            this.$router.push({
              name: "catalogs.pages.list"
            });
          }

          this.btnDisabled = false;
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);

          swal({
            title: "Houve um erro na solicitação!",
            text: "Corrija os erros!",
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
          });

          console.log(error.response);
        });
      this.btnDisabled = false;

      setTimeout(() => {
        this.status = false;
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
