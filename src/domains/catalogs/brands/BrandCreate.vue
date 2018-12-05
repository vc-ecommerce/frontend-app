<template>
  <div>
    <section>
      <LinkBreadcrumb :title="title"/>
    </section>

    <Panel :title="title" classContent="panel-body">
      <div class="row">
        <div class="col-sm-12">
          <AlertDivs :status="status" :error="error"/>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-sm-2">Marca ativa?</div>
          <div class="col-sm-10">
            <select class="form-control col-sm-3" required v-model="data.active">
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
          <div class="col-sm-2">Marca em destaque?</div>
          <div class="col-sm-10">
            <small>Marcas com destaques aparecem no carrosel de marcas na página home da loja.</small>

            <select class="form-control col-sm-3" required v-model="data.spotlight">
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
          <div class="col-sm-2">Nome da marca</div>
          <div class="col-sm-10">
            <input
              type="text"
              required
              class="form-control"
              v-model="data.name"
              placeholder="Digite aqui o nome da marca"
            >
            <Slug :slug="applySlug" directory="marca"/>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2">Logo</div>
          <div class="col-sm-10">
            <div v-if="data.image">
              <small>Preview</small>
              <br>
              <img :src="data.image" style="margin: 0 0 10px 0; max-height:80px">
            </div>
            <input type="file" @change="saveImage" class="form-control">
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2">Descrição:</div>
          <div class="col-sm-10">
            <div class="form-group">
              <html-editor height="200" :dataDesc="data.description" :model.sync="data.description"></html-editor>
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
                        :href="urlSeo"
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
              :to="{ name: 'catalogs.brands.list' }"
              class="btn btn-inline btn-sm btn-default"
            >
              <i class="glyphicon glyphicon-remove"></i> Cancelar
            </router-link>
            <button :disabled="btnDisabled" class="btn btn-inline" type="submit">
              <i class="glyphicon glyphicon-ok"></i> Cadastrar Marca
            </button>
          </div>
        </div>
      </form>
    </Panel>
  </div>
</template>
<script>
import Panel from "@/components/layouts/Panel";
import Alert from "@/components/layouts/Alert";
import Slug from "@/components/utils/Slug";
import WidgetAccordion from "@/components/widgets/WidgetAccordion";
import WidgetAccordionContent from "@/components/widgets/WidgetAccordionContent";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import HtmlEditor from "@/components/summernote/HtmlEditor";
import { HttpServices as service } from "@/services/http-services";
import AlertDivs from "./components/AlertDivs";
import { isAclToPage } from "@/utils/authorizations-helpers";
import { transformImageToBase64 } from "@/utils/image-helpers";
import { optionsSelectTrueOrFalse } from "@/utils/array-helpers";
import { urlGoogleSeoExample } from "@/commons/configGoogle";
import LinkBreadcrumb from "./components/LinkBreadcrumb";

export default {
  name: "BrandEdit",
  components: {
    Panel,
    Alert,
    Slug,
    WidgetAccordion,
    WidgetAccordionContent,
    HtmlEditor,
    AlertDivs,
    LinkBreadcrumb
  },
  props: [],
  data() {
    return {
      title: "Criando Marca",
      data: {
        name: "",
        description: "",
        active: true,
        spotlight: false,
        image: "",
        slug: "",
        meta_description: "",
        meta_title: ""
      },

      status: false,
      error: false,
      btnDisabled: false,
      options: optionsSelectTrueOrFalse()
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR");
  },
  computed: {
    applySlug() {
      return this.data.name ? tool.strSlug(this.data.name) : "";
    },
    urlSeo() {
      return urlGoogleSeoExample;
    }
  },
  methods: {
    saveImage(e) {

      transformImageToBase64(e)
      .then(res => {
         this.data.image = res;
      })
      .catch(console.log);

    },

    submitForm() {
      console.log(this.data.image);

      this.status = "Enviando...";
      this.btnDisabled = true;

      service
        .post("/admin/brands", {
          name: this.data.name,
          description: this.data.description,
          slug: tool.strSlug(this.data.name),
          active: this.data.active,
          spotlight: this.data.spotlight,
          image: this.data.image,
          meta_description: this.data.meta_description,
          meta_title: this.data.meta_title
        })
        .then(res => {
          this.error = false;
          this.status = false;

          if (res.status === 201) {
            swal({
              title: "Dados cadastrados!",
              text: "Marca foi cadastrada com sucesso.",
              type: "success",
              confirmButtonClass: "btn-success",
              confirmButtonText: "OK"
            });

            this.$router.push({
              name: "catalogs.brands.list"
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
