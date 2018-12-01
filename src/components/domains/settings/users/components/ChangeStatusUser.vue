<template>
  <button
    v-if="isUserLogged"
    type="button"
    @click.prevent="update(dataItem)"
    class="tabledit-delete-button btn btn-sm"
    style="float: none; margin-right:-1px"
  >
    <span v-if="dataItem.active" class="glyphicon glyphicon-eye-open"></span>
    <span v-else class="glyphicon glyphicon-eye-close"></span>
  </button>
</template>
<script>
import { HttpServices as service } from "@/services/http-services";

export default {
  name: "ChangeStatusUser",
  components: {},
  props: ["dataItem"],
  data() {
    return {};
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
    send(user) {
      return new Promise((resolve, reject) => {
        service
          .put(`/admin/users/${user._id}`, {
            active: !Boolean(user.active),
            action: "edit-status"
          })
          .then(res => {
            if (Boolean(res.data) === true) {
              resolve(true);
            }
            reject(false);
          })
          .catch(error => {
            reject(false);
          });
      });
    },

    update(user) {
      let status, titleQuestion, titleResp, textResp;
      const vm = this;

      status = !Boolean(user.active);

      if (status === true) {
        titleQuestion = "ativar";
      } else {
        titleQuestion = "desativar";
      }

      swal(
        {
          title: `Deseja realmente ${titleQuestion} o usuário?`,
          text: user.name,
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
                if (status === true) {
                  titleResp = "Ativado";
                  textResp = "ativado";
                } else {
                  titleResp = "Desativado";
                  textResp = "desativado";
                }
                swal({
                  title: titleResp,
                  text: `Usuário ${textResp} com sucesso.`,
                  type: "success",
                  confirmButtonClass: "btn-success"
                });

                user.active = !user.active;
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
    }
  }
};
</script>
