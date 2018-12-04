<template>
  <Breadcrumb :title="breadcrumbTitle">
    <li>
      <a href="javascript::void(0)">Catálogos</a>
    </li>
    <li>
      <router-link :to="{ name: 'catalogs.pages.list'}">{{ breadcrumbTitle }}</router-link>
    </li>
    <li class="active">{{ title }}</li>
  </Breadcrumb>
</template>
<script>
import Breadcrumb from "@/components/layouts/Breadcrumb";
export default {
  name: "LinkBreadcrumb",
  components: {
    Breadcrumb
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      breadcrumbTitle: 'Páginas'
    }
  }
};
</script>
