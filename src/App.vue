<template>
  <span id="app">
    <div v-if="!isPublic">
      <span v-show="showHtml">
        <SiteHeader/>
        <SidebarMenuLeft/>
        <div class="page-content">
          <div class="container-fluid">
            <router-view/>
          </div>
        </div>
        <SidebarMenuRight/>
      </span>
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
    <AxiosLoader/>
  </span>
</template>

<script>
import AxiosLoader from "@/components/loaders/AxiosLoader";
import { validateHelpers as validate } from "@/utils/validate-helpers";
import { isAclDashboardAdmin } from "@/utils/authorizations-helpers";
import { domHelpers as dom } from "@/utils/dom-helpers";
import SiteHeader from "@/components/layouts/header/SiteHeader";
import SidebarMenuLeft from "@/components/layouts/sidebar/SidebarMenuLeft";
import SidebarMenuRight from "@/components/layouts/sidebar/SidebarMenuRight";
import { checkInternetConnected } from "@/utils/observer.helpers";

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
      isPublic: false,
      showHtml: false
    };
  },
  created() {
    if (validate.isPagePublic()) {
      dom.removeClassBody();
      this.isPublic = true;
    }
  },
  mounted() {
    let user = this.$store.getters.getUser
      ? this.$store.getters.getUser
      : false;

    if (this.isPublic) {
      if (user) {
        return window.location.replace("/");
      }
    }

    if (!this.isPublic) {
      if (!user) {
        sessionStorage.clear();
        localStorage.clear();
        localStorage.setItem("pathnameReferer", window.location.pathname);
        return window.location.replace("/login");
      }

      isAclDashboardAdmin(
        "ADMIN",
        "STAFF_AUDITOR",
        "STAFF_FINANCE",
        "STAFF_COMMERCIAL",
        "STAFF_SUPPORT",
        "STAFF_SALE",
        "STAFF_EDITOR",
        "STAFF_EXPEDITION"
      );
    }

    this.$eventHub.$on(
      "eventDocumentTitle",
      obj => (document.title = obj.data)
    );

    if (!this.isPublic) {
      dom.createTitle("Painel de Controle");
    }

    this.showHtml = true;
    checkInternetConnected();
  },
  beforeDestroy() {
    this.$eventHub.$off(
      "eventDocumentTitle",
      obj => (document.title = obj.data)
    );
  }
};
</script>
