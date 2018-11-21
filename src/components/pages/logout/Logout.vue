<template>
  <div>Desconectando...</div>
</template>
<script>
export default {
  name: "Logout",
  mounted() {
    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.setItem("desconected", true);
    return window.location.replace("/login");
  }
};
</script>
