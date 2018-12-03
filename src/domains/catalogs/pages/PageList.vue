<template>
  <div>
    <section>
      <Breadcrumb title="Páginas de Informações">
        <li>
          <a href="javascript::void(0)">Catálogos</a>
        </li>
        <li>
          <router-link :to="{ name: 'catalogs.pages.list'}">Páginas de Informações</router-link>
        </li>
        <li class="active">Listar</li>
      </Breadcrumb>
    </section>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Página</h3>
            <h3 v-else>{{ total }} Páginas</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <router-link :to="{ name: 'catalogs.pages.create' }" class="btn btn-inline">
              <i class="glyphicon glyphicon-plus"></i> Criar Página
            </router-link>
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" class="table table-hover">
            <template slot="thead">
              <tr>
                <th>Páginas</th>
                <th class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(page, index) in pages.data" :key="index">
                <td class="tabledit-view-mode">{{ page.name }}</td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none  !important;">
                      <ChangeStatus :dataItem="page"/>

                      <button
                        v-if="!page.default"
                        @click.prevent="clickEdit(page._id)"
                        type="button"
                        class="tabledit-edit-button btn btn-sm btn-default"
                        style="float: none;"
                      >
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>

                      <RemovePage v-if="!page.default" :dataPages="pages" :dataItem="page"/>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </section>
    <section>
      <Pagination v-if="total>15" :pagination="pages" @paginate="getPages()" :offset="4"/>
    </section>
  </div>
</template>
<script>
import Breadcrumb from "@/components/layouts/Breadcrumb";
import RemovePage from "./components/RemovePage";
import ChangeStatus from "./components/ChangeStatus";
import Table from "@/components/layouts/Table";
import Pagination from "@/components/paginations/Pagination";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "PageList",
  components: {
    RemovePage,
    ChangeStatus,
    Table,
    Pagination,
    Breadcrumb
  },
  props: [],
  data() {
    return {
      total: 0,
      pages: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      roles: []
    };
  },
  methods: {
    clickEdit(id) {
      this.$router.push({ name: "catalogs.pages.edit", params: { id } });
    },

    getPages() {
      service
        .get(`/admin/pages?page=${this.pages.current_page}`)
        .then(res => {
          this.pages = res.data;
          this.total = res.data.total;
        })
        .catch(console.log);
    },

    handler() {
      this.getPages();
    }
  },
  mounted() {
    this.handler();
    this.$eventHub.$on("reloadHandler", obj => this.handler());
    this.$eventHub.$on("totalPages", value => (this.total = value));
  },
  beforeDestroy() {
    this.$eventHub.$off("reloadHandler", obj => this.handler());
    this.$eventHub.$off("totalPages", value => (this.total = value));
  }
};
</script>

<style scoped>
small {
  font-size: 11px;
  color: #999;
  font-weight: normal;
}
</style>
