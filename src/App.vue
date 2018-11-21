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
import ValidatesHelper from "@/helpers/ValidatesHelper";

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
    };
  },
  created() {
    if (ValidatesHelper.isPagesPublic()) {
      this.isPublic = true;
    }
    if (!this.isPublic) {
      document.title = "Painel de Controle";
    }
  }
};
</script>
