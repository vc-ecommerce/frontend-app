<template>
  <div>
    <section>
      <LinkBreadcrumb title="Listar" />
    </section>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Página</h3>
            <h3 v-else>{{ total }} Páginas</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <router-link :to="{ name: 'catalogs.brands.create' }" class="btn btn-inline">
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
              <tr v-for="(brand, index) in brands.data" :key="index">
                <td class="tabledit-view-mode">{{ brand.name }}</td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none  !important;">
                      <ChangeStatus :dataItem="brand"/>

                      <button
                        v-if="!brand.default"
                        @click.prevent="clickEdit(brand._id)"
                        type="button"
                        class="tabledit-edit-button btn btn-sm btn-default"
                        style="float: none;"
                      >
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>

                      <RemoveBrand v-if="!brand.default" :dataBrands="brands" :dataItem="brand"/>
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
      <Pagination v-if="total>15" :pagination="brands" @paginate="getBrands()" :offset="4"/>
    </section>
  </div>
</template>
<script>
import RemoveBrand from "./components/RemoveBrand";
import ChangeStatus from "./components/ChangeStatus";
import Table from "@/components/layouts/Table";
import Pagination from "@/components/paginations/Pagination";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { isAclToBrand } from "@/utils/authorizations-helpers";
import LinkBreadcrumb from "./components/LinkBreadcrumb";

export default {
  name: "BrandList",
  components: {
    RemoveBrand,
    ChangeStatus,
    Table,
    Pagination,
    LinkBreadcrumb
  },
  props: [],
  data() {
    return {
      total: 0,
      brands: {
        total: 0,
        per_brand: 2,
        from: 1,
        to: 0,
        current_brand: 1
      },
      offset: 4,
      roles: []
    };
  },
  beforeCreate() {
    isAclToBrand("ADMIN", "STAFF_EDITOR", "STAFF_AUDITOR");
  },
  methods: {
    clickEdit(id) {
      this.$router.push({ name: "catalogs.brands.edit", params: { id } });
    },

    getBrands() {
      service
        .get(`/admin/brands?brand=${this.brands.current_brand}`)
        .then(res => {
          this.brands = res.data;
          this.total = res.data.total;
        })
        .catch(console.log);
    },

    handler() {
      this.getBrands();
    }
  },
  mounted() {
    this.handler();
    this.$eventHub.$on("reloadHandler", obj => this.handler());
    this.$eventHub.$on("totalBrands", value => (this.total = value));
  },
  beforeDestroy() {
    this.$eventHub.$off("reloadHandler", obj => this.handler());
    this.$eventHub.$off("totalBrands", value => (this.total = value));
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
