<template>
  <button
    type="button"
    @click.prevent="update(dataItem)"
    class="tabledit-delete-button btn btn-sm"
    style="float: none;"
  >
    <span v-if="dataItem.active" class="glyphicon glyphicon-eye-open"></span>
    <span v-else class="glyphicon glyphicon-eye-close"></span>
  </button>
</template>
<script>
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "ChangeStatus",
  components: {},
  props: ["dataItem"],
  data() {
    return {};
  },
  methods: {
    send(page) {
      let status = !Boolean(page.active);
      let result = false;

      service
        .put(`/admin/pages/${page._id}`, {
          active: status,
          action: "edit-status"
        })
        .then(res => {
          if (Boolean(res.data) === true) {
            resolve(true);
          }
          reject(false);
        })
        .catch(console.log);
    },
    update(page) {
      let status, titleQuestion, titleResp, textResp;
      const vm = this;

      status = !Boolean(page.active);

      if (status === true) {
        titleQuestion = "ativar";
      } else {
        titleQuestion = "desativar";
      }

      swal(
        {
          title: `Deseja realmente ${titleQuestion} a página?`,
          text: page.name,
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
              .then(function(value) {
                page.active = !page.active;

                if (status === true) {
                  titleResp = "Ativado";
                  textResp = "ativado";
                } else {
                  titleResp = "Desativado";
                  textResp = "desativado";
                }

                swal({
                  title: titleResp,
                  text: `Página ${textResp} com sucesso.`,
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
