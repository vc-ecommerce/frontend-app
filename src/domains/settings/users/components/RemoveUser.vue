<template>
  <button
    v-if="isUserLogged"
    type="button"
    @click.prevent="remove(dataItem)"
    class="tabledit-delete-button btn btn-sm btn-danger"
    style="float: none; margin-left:-1px"
  >
    <span class="glyphicon glyphicon-trash"></span>
  </button>
</template>
<script>
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "RemoveUser",
  components: {},
  props: ["dataUsers", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
  },
  computed: {
    isUserLogged() {
      if (this.dataItem._id === this.$store.getters.getUserId) {
        return false;
      }
      return true;
    }
  },
  methods: {
    remove(user) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${user.name}`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Sim!",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false
        },

        function(isConfirm) {
          if (isConfirm) {
            vm.send(user)
              .then(res => {
                let index = vm.dataUsers.data.indexOf(user);
                vm.dataUsers.data.splice(index, 1);

                vm.dataUsers.total = vm.dataUsers.total - 1;
                vm.$eventHub.$emit("totalUsers", vm.dataUsers.total);

                swal({
                  title: "Removido",
                  text: "Dados foram removidos com sucesso",
                  type: "success",
                  confirmButtonClass: "btn-success"
                });
              })
              .catch(error => {
                swal({
                  title: "Erro",
                  text: "Houve um erro na socilitação do pedido.",
                  type: "error",
                  confirmButtonClass: "btn-danger"
                });
              });
          } else {
            swal({
              title: "Cancelado",
              text: "Pedido cancelado com sucesso.",
              type: "error",
              confirmButtonClass: "btn-danger"
            });
          }
        }
      );
    },

    send(user) {
      return new Promise((resolve, reject) => {
        service
          .delete(`/admin/users/${user._id}`)
          .then(res => {
            if (Boolean(res.data) === true) {
              resolve(true);
            }
            reject(false);
          })
          .catch(console.log);
      });
    }
  }
};
</script>
