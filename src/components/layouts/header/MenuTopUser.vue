<template>
  <div class="dropdown user-menu">
    <button class="dropdown-toggle" id="dd-user-menu" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="@/assets/img/avatar-2-64.png" alt="">
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd-user-menu">

      <router-link v-if="user" :to="{ name: 'user.account'}" class="dropdown-item">
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

      <a href="javascript:void(0)"  @click="$eventHub.$emit('eventLogout', true)" class="dropdown-item">
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
  }
}
</script>
