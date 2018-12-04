<template>
  <button
    type="button"
    @click.prevent="remove(dataItem)"
    class="tabledit-delete-button btn btn-sm btn-danger"
  >
    <span class="glyphicon glyphicon-trash"></span>
  </button>
</template>
<script>
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "RemovePage",
  components: {},
  props: ["dataPages", "dataItem"],
  data() {
    return {
      total: 0,
      active: true
    };
  },
  methods: {
    send(page) {
      return new Promise((resolve, reject) => {
        service
          .delete(`/admin/pages/${page._id}`)
          .then(res => {
            if (Boolean(res.data) === true) {
              resolve(true);
            }
            reject(false);
          })
          .catch(console.log);
      });
    },
    remove(page) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir a página?",
          text: `${page.name}`,
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
            vm.send(page)
              .then(res => {
                let index = vm.dataPages.data.indexOf(page);
                vm.dataPages.data.splice(index, 1);

                vm.dataPages.total = vm.dataPages.total - 1;
                vm.$eventHub.$emit("totalPages", vm.dataPages.total);

                swal({
                  title: "Removido",
                  text: "A página foi removida com sucesso",
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

                console.log(error.response);
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
    }
  }
};
</script>
