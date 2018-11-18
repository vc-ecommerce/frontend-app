<template>
  <span id="app">

    <div v-if="!isPublic">
      <SiteHeader />
      <SidebarMenuLeft />
      <div class="page-content">
        <div class="container-fluid">
          <router-view/>
        </div>
      </div>
      <SidebarMenuRight />
    </div>

    <div v-if="isPublic">
      <div class="page-center">
        <div class="page-center-in">
            <div class="container-fluid">
              <router-view/>
            </div>
        </div>
      </div>
    </div>

    <AxiosLoader />

  </span>
</template>

<script>
import SiteHeader from "@/components/layouts/header/SiteHeader";
import SidebarMenuLeft from "@/components/layouts/sidebar/SidebarMenuLeft";
import SidebarMenuRight from "@/components/layouts/sidebar/SidebarMenuRight";
import AxiosLoader from "@/commons/AxiosLoader";

export default {
  name: "App",
  components: {
    SiteHeader,
    SidebarMenuLeft,
    SidebarMenuRight,
    AxiosLoader
  },
  data() {
    return {
      isPublic: false
    }
  },
  beforeCreate() {
    let vm = this;
    this.$eventHub.$on("eventPublic", function(data) {
      document.addEventListener("DOMContentLoaded", function() {
        document.body.classList.remove("with-side-menu");
        document.body.classList.remove("control-panel");
        document.body.classList.remove("control-panel-compact");
        document.body.classList.add("auth");
      });
      if(data) {
         vm.isPublic = true;
      }
    });
  },
  mounted() {
    if (!this.isPublic) {
      document.title="Painel de Controle"
    }
  }
};
</script>
