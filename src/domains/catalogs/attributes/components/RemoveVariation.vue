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
  name: "RemoveVariation",
  components: {},
  props: ["dataVariations", "dataItem"],
  data() {
    return {
      total: 0,
      active: true,
      attributeId: this.$route.params.id
    };
  },
  methods: {
    send(variation) {
      return new Promise((resolve, reject) => {
        service
          .delete(
            `/admin/attributes/${this.attributeId}/variations/${
              this.dataItem._id
            }`
          )
          .then(res => {
            if (Boolean(res.data) === true) {
              resolve(true);
            }
            reject(false);
          })
          .catch(console.log);
      });
    },
    remove(variation) {
      const vm = this;
      swal(
        {
          title: "Deseja realmente excluir a variação?",
          text: `${variation.name}`,
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
            vm.send(variation)
              .then(res => {
                let index = vm.dataVariations.data.indexOf(variation);
                vm.dataVariations.data.splice(index, 1);

                vm.dataVariations.total = vm.dataVariations.total - 1;
                vm.$eventHub.$emit("totalAttributes", vm.dataVariations.total);

                swal({
                  title: "Removido",
                  text: "Variação removida com sucesso",
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
