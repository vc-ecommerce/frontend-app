<template>
  <div>
    <section>
      <Breadcrumb title="Privilégios">
        <li>
          <a href="javascript::void(0)">Configurações</a>
        </li>
        <li>
          <router-link :to="{ name: 'settings.privileges.list'}">Privilégios</router-link>
        </li>
        <li class="active">Listar</li>
      </Breadcrumb>
    </section>

    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Privilégio</h3>
            <h3 v-else>{{ total }} Privilégios</h3>
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" class="table table-hover">
            <template slot="thead">
              <tr>
                <th width="200">Privilégios</th>
                <th>Name</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(privilege, index) in privileges.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ privilege.description }}
                  <br>
                  <small></small>
                </td>
                <td class="tabledit-view-mode">
                  <span class="label label-info">{{ privilege.name }}</span>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Table from "@/components/layouts/Table";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { isAclToPage } from "@/utils/authorizations-helpers";

export default {
  name: "PrivilegeList",
  components: {
    Table,
    Breadcrumb
  },
  props: [],
  data() {
    return {
      total: 0,
      privileges: []
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN");
  },
  created() {
    this.getPrivileges();
  },
  methods: {
    getPrivileges() {
      service
        .get("/admin/privileges")
        .then(res => {
          this.privileges = res.data;
          this.total = res.data.total;
        })
        .catch(console.log);
    }
  }
};
</script>
