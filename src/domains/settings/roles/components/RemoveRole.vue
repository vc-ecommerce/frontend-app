<template>
  <button
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
  name: "RemoveRole",
  components: {},
  props: ["dataRoles", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
  },
  methods: {
    remove(role) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir?",
          text: `${role.description}`,
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
            vm.send(role)
              .then(res => {
                let index = vm.dataRoles.data.indexOf(role);
                vm.dataRoles.data.splice(index, 1);

                vm.dataRoles.total = vm.dataRoles.total - 1;
                vm.$eventHub.$emit("totalRoles", vm.dataRoles.total);

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

    send(role) {
      return new Promise((resolve, reject) => {
        service;
        service
          .delete(`/admin/roles/${role._id}`)
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
