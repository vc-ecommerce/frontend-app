<template>
  <span id="app">
    <div v-if="!isAuth">
      <SiteHeader />
      <SidebarMenuLeft />
      <div class="page-content">
        <div class="container-fluid">
          <router-view/>
        </div>
      </div>
      <SidebarMenuRight />
    </div>

    <div v-if="isAuth">
      <div class="page-center">
        <div class="page-center-in">
            <div class="container-fluid">
              <router-view/>
            </div>
        </div>
      </div>
    </div>
    <!-- <div id="loader">
      <loader />
    </div> -->
  </span>
</template>

<script>
import SiteHeader from "@/components/layouts/header/SiteHeader";
import SidebarMenuLeft from "@/components/layouts/sidebar/SidebarMenuLeft";
import SidebarMenuRight from "@/components/layouts/sidebar/SidebarMenuRight";

export default {
  name: "App",
  components: {
    SiteHeader,
    SidebarMenuLeft,
    SidebarMenuRight
  },
  data() {
    return {
      isAuth: false
    }
  },
  beforeCreate() {
    let vm = this;
    this.$eventHub.$on("eventAuth", function(data) {
      document.addEventListener("DOMContentLoaded", function() {
        document.body.classList.remove("with-side-menu");
        document.body.classList.remove("control-panel");
        document.body.classList.remove("control-panel-compact");
        document.body.classList.add("auth");
      });
      vm.isAuth = data;
    });
  },
  mounted() {
    if (!this.isAuth) {
      document.title="Painel de Controle"
    }
  }
};
</script>
