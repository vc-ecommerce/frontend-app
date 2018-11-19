<template>
  <div>Desconectando...</div>
</template>
<script>
export default {
  name: "Logout",
  mounted() {
    sessionStorage.clear();
    return this.$router.push({ name: "auth.login" });
  }
};
</script>
