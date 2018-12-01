<template>
  <div class="dropdown user-menu">
    <button class="dropdown-toggle" id="dd-user-menu" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="@/assets/img/avatar-2-64.png" alt="">
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd-user-menu">

      <router-link v-if="user" :to="{ name: 'account.index'}" class="dropdown-item">
        <span class="font-icon glyphicon glyphicon-user"></span>
        {{ user.name || ''}}
      </router-link>

      <!--
      <a class="dropdown-item" href="#">
        <span class="font-icon glyphicon glyphicon-cog"></span>
        Configurações
      </a>
      <a class="dropdown-item" href="#">
        <span class="font-icon glyphicon glyphicon-question-sign"></span>
        Ajuda
      </a>
      -->
      <div class="dropdown-divider"></div>

      <a href="javascript:void(0)"  @click="logout()" class="dropdown-item">
        <span class="font-icon glyphicon glyphicon-log-out"></span>
        Sair
      </a>

    </div>
  </div>
</template>
<script>
export default {
  name: "MenuTopUser",
  data() {
    return {
      user: this.$store.getters.getUser
    }
  },
  methods: {

    logout() {

      return swal(
        {
          title: "Logout!",
          text: "Deseja realemente sair do sistema?",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
          closeOnConfirm: false
        },
        function() {
          sessionStorage.clear();
          localStorage.clear();
          sessionStorage.setItem("desconected", true);
          return window.location.replace("/login");
        }
      );
    }
  }
}
</script>
