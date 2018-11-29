<template>
  <span>

    <ModalButton
    btnClass="tabledit-edit-button btn btn-sm btn-default"
    iconClass="glyphicon glyphicon-pencil"
    :dataItem="dataItem" />

    <ModalLarge :idModal="$store.getters.getItem ? $store.getters.getItem._id : ''"
      titleModal="Editar função"
      sizeModal="lg">

      <div v-if="status && error === false" class="row">
        <Alert className="alert alert-success alert-fill alert-close alert-dismissible fade show">
          {{ status }}
        </Alert>
      </div>

      <div v-if="error && status === false" class="row">
        <Alert className="alert alert-danger alert-fill alert-close alert-dismissible fade show">
          <dl>
            <dt v-for="err in error" :key="err.id">
              {{ cleanData( err ) }}
            </dt>
          </dl>
        </Alert>
      </div>

      <form id="edit-role" @submit.prevent="submitForm">

        <div class="row">
          <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="role">Role Description</label>
              <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.description" placeholder="Description">
            </fieldset>
          </div>
           <div class="col-lg-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input v-if="$store.getters.getItem" type="text" required class="form-control" v-model="$store.getters.getItem.name" placeholder="Example: STAFF_COMMERCIAL">
            </fieldset>
          </div>
        </div>

        <div class="row" style="margin:10px 0 10px 0">
          <label class="form-label semibold">Privilégios</label>
        </div>

        <div class="row">
          <div class="checkbox-toggle" v-for="(privilege, index) in dataPrivilegies" :key="index" style="margin-left:20px">
            <span :class="index = index + random"></span>
            <input type="checkbox" v-model="privilegeRole" :id="'check-toggle-'+ index" :value="privilege">
            <label :for="'check-toggle-'+ index">{{ privilege.description }}</label>
          </div>
        </div>

      </form>

      <span slot="btn">
        <button form="edit-role" type="submit" class="btn btn-rounded btn-primary"><i class="glyphicon glyphicon-ok"></i> Salvar Alterações</button>
      </span>

    </ModalLarge>
  </span>
</template>
<script>
import Table from "@/components/layouts/Table";
import ModalLarge from "@/components/modals/ModalLarge";
import ModalButton from "@/components/modals/ModalButton";
import Alert from "@/components/layouts/Alert";
import { toolHelpers as tool } from "@/utils/tool-helpers";
import { HttpServices as service } from "@/services/http-services";
import { optionsTrueOrFalse } from '@/utils/array-helpers';

export default {
  name: "EditRole",
  components: {
    Table,
    ModalLarge,
    ModalButton,
    Alert
  },
  props: ["dataPrivilegies", "dataItem"],
  data() {
    return {
      status: false,
      error: false,
      role: {
        name: "",
        description: "",
        privileges: []
      },
      options: optionsTrueOrFalse
    };
  },
  computed: {

    random: () => tool.strRandom(),

    privilegeRole: {
      get() {
        return this.$store.getters.getItem
          ? this.$store.getters.getItem.privileges
          : [];
      },
      set(value) {
        let item = this.$store.getters.getItem;
        item.privileges = value;
        this.$store.commit("setItem", item);
      }
    }
  },
  methods: {
    cleanData(data) {
      return tool.cleanDataApi(data);
    },
    submitForm() {
      if (!this.$store.getters.getItem) {
        return;
      }

      let data = this.$store.getters.getItem;

      this.status = "Enviando...";

      const api = `${this.$urlApi}/admin/roles/${data._id}`;
      Vue.axios
        .put(
          api,
          {
            name: data.name.toUpperCase(),
            description: data.description,
            privileges: data.privileges,
            default: false,
            action: "edit-role"
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "User-ID": this.$store.getters.getUserId
            }
          }
        )
        .then(res => {
          this.error = false;
          this.roles = res.data;
          this.total = res.data.total;
          this.status = "Função editada com sucesso!";
          this.$emit("reload");
        })
        .catch(error => {
          this.status = false;
          this.error = JSON.parse(error.response.data.error);

          setTimeout(() => {
            this.error = false;
          }, 5000);
        });
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
