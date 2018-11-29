<template>
  <div>
    <section class="box-typical">
      <header class="box-typical-header">
        <div class="tbl-row">
          <div class="tbl-cell tbl-cell-title">
            <h3 v-if="total == 1">{{ total }} Usuário</h3>
            <h3 v-else>{{ total }} Usuários</h3>
          </div>
          <div class="tbl-cell tbl-cell-action-bordered">
            <!--<CreateUser :dataRoles="roles" @reload="getUsers()"/>-->
          </div>
        </div>
      </header>
      <div class="box-typical-body">
        <div class="table-responsive">
          <Table elementId="table-edit" class="table table-hover">
            <template slot="thead">
              <tr>
                <th>Usuários</th>
                <th width="200">Departamentos</th>
                <th class="tabledit-toolbar-column">Editar</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(user, index) in users.data" :key="index">
                <td class="tabledit-view-mode">
                  {{ user.name }}
                  <br>
                  <small></small>
                </td>
                <td>
                  <span
                    v-for="(role, index) in user.roles"
                    :key="index"
                    class="label label-info"
                    style="margin:2px"
                  >{{ role.description }}</span>
                </td>
                <td style="white-space: nowrap; width: 1%;">
                  <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                    <div class="btn-group btn-group-sm" style="float: none;">
                      <ChangeStatusUser :dataItem="user"/>
                      <EditUser :dataItem="user" :dataRoles="roles" />





                      <RemoveUser :dataUsers="users" :dataItem="user"/>
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
      <Pagination v-if="total>15" :pagination="users" @paginate="getUsers()" :offset="4"/>
    </section>




  </div>
</template>
<script>
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import ChangeStatusUser from "./components/ChangeStatusUser";
import RemoveUser from "./components/RemoveUser";
import Table from "@/components/layouts/Table";
import Pagination from "@/components/paginations/Pagination";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { isAclToPage } from "@/utils/authorizations-helpers";
import { HttpServices as service } from "@/services/http-services";
import Modal from "@/components/modals/Modal";

export default {
  name: "UserList",
  components: {
    Modal,
    CreateUser,
    EditUser,
    ChangeStatusUser,
    RemoveUser,
    Table,
    Pagination
  },
  props: [],
  data() {
    return {
      total: 0,
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      roles: [],
      showModal: false
    };
  },
  beforeCreate() {
    isAclToPage("ADMIN");
  },
  watch: {
    showModal: function(){
      if(this.showModal == false) {}
      // do something
    },
  },
  mounted() {
    this.getUsers();
    this.getRoles();
    const vm = this;
    this.$eventHub.$on("totalUser", function(t) {
      vm.total = t;
    });
  },
  methods: {
    getRoles() {
      service
        .get("/admin/roles")
        .then(res => {
          this.roles = tool.cleanRole(res.data.data);
        })
        .catch(console.log);
    },
    getUsers() {
      service
        .get(`/admin/users?page=${this.users.current_page}`)
        .then(res => {
          this.users = res.data;
          this.total = res.data.total;
        })
        .catch(console.log);
    }
  },
  beforeDestroy() {
    this.$eventHub.$off("totalUser", function(t) {
      vm.total = t;
    });
  }
};
</script>
