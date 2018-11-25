<template>
  <span id="app">
    <div v-if="!isPublic">
      <span v-show="showHtml">
        <SiteHeader />
        <SidebarMenuLeft />
        <div class="page-content">
          <div class="container-fluid">
            <router-view/>
          </div>
        </div>
        <SidebarMenuRight />
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
    <AxiosLoader />
  </span>
</template>

<script>
import AxiosLoader from "@/components/loaders/AxiosLoader";
import { validateHelpers as validate } from "@/utils/validate-helpers";
import { domHelpers as dom } from "@/utils/dom-helpers";
import SiteHeader from "@/components/layouts/header/SiteHeader";
import SidebarMenuLeft from "@/components/layouts/sidebar/SidebarMenuLeft";
import SidebarMenuRight from "@/components/layouts/sidebar/SidebarMenuRight";

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
    if (validate.isPagesPublic()) {
      dom.removeClassBody();
      this.isPublic = true;
    }
  },
  methods: {
    cleanDataStorage() {
      sessionStorage.clear();
      localStorage.clear();
    },
    logout() {
      const vm = this;
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
          vm.cleanDataStorage();
          sessionStorage.setItem("desconected", true);
          return window.location.replace("/login");
        }
      );
    }
  },
  mounted() {
    this.$eventHub.$on("eventLogout", obj => this.logout());

    if (this.isPublic !== true) {
      let user = this.$store.getters.getUser
        ? this.$store.getters.getUser
        : false;

      if (!user) {
        this.cleanDataStorage();
        localStorage.setItem("pathnameReferer", window.location.pathname);
        return window.location.replace("/login");
      }

      validate.rolesUserAuthorizedPanelAdmin(
        this.$store.getters.getUserRoles,
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
  }
};
</script>
