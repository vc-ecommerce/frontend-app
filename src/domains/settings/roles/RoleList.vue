<template>
  <div>
    <section>
      <Breadcrumb title="Funções [Roles]">
        <li>
          <a href="javascript::void(0)">Configurações</a>
        </li>
        <li>
          <router-link :to="{ name: 'settings.users.list'}">Funções [Roles]</router-link>
        </li>
        <li class="active">Listar</li>
      </Breadcrumb>
    </section>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Função</h3>
            <h3 v-else>{{ total }} Funções</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <CreateRole :dataPrivileges="privileges"/>
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" class="table table-hover">
            <template slot="thead">
              <tr>
                <th width="200">Funções</th>
                <th>Name</th>
                <th>Privilégios</th>
                <th width="300" class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(role, index) in roles.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ role.description }}
                  <br>
                  <small></small>
                </td>
                <td class="tabledit-view-mode">
                  <span class="label label-info">{{ role.name }}</span>
                </td>
                <td>
                  <span
                    v-for="(privilege) in role.privileges"
                    :key="privilege._id"
                    class="label label-success"
                    style="margin:2px"
                  >{{ privilege.description }}</span>
                </td>

                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">
                      <EditRole
                        v-if="!role.default"
                        :dataPrivileges="privileges"
                        :dataRoles="roles"
                        :dataItem="role"
                      />
                      <RemoveRole v-if="!role.default" :dataRoles="roles" :dataItem="role"/>
                    </div>
                  </div>
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
import Breadcrumb from "@/components/layouts/Breadcrumb";
import CreateRole from "./components/CreateRole";
import EditRole from "./components/EditRole";
import RemoveRole from "./components/RemoveRole";
import Table from "@/components/layouts/Table";
import { isAclToPage } from "@/utils/authorizations-helpers";
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "RoleList",
  components: {
    Breadcrumb,
    CreateRole,
    EditRole,
    RemoveRole,
    Table
  },
  props: [],
  data() {
    return {
      total: 0,
      roles: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      privileges: []
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN");
  },
  created() {
    this.handler();
  },
  mounted() {
    this.$eventHub.$on("reloadHandler", obj => this.handler());
    this.$eventHub.$on("totalRoles", value => (this.total = value));
  },
  beforeDestroy() {
    this.$eventHub.$off("reloadHandler", obj => this.handler());
    this.$eventHub.$off("totalRoles", value => (this.total = value));
  },
  methods: {
    getRoles() {
      service
        .get(`/admin/roles?page=${this.roles.current_page}`)
        .then(res => {
          this.roles = res.data;
          this.total = res.data.total;
        })
        .catch(console.log);
    },

    getPrivileges() {
      service
        .get("/admin/privileges")
        .then(res => {
          this.privileges = res.data.data;
        })
        .catch(console.log);
    },

    handler() {
      this.getRoles();
      this.getPrivileges();
    }
  }
};
</script>
