<template>
  <span>
    <div v-if="status" class="row">
      <Alert
        alertClass="alert alert-success alert-fill alert-close alert-dismissible fade show"
      >{{ status }}</Alert>
    </div>

    <div v-if="passwordInvalid" class="row">
      <Alert alertClass="alert alert-danger alert-fill alert-close alert-dismissible fade show">
        <strong>Atenção:</strong> Senha administrativa fraca, tente outra mais forte.
      </Alert>
    </div>

    <div v-if="error" class="row">
      <Alert alertClass="alert alert-danger alert-fill alert-close alert-dismissible fade show">
        <dl>
          <dt v-for="err in error" :key="err.id">{{ cleanData( err ) }}</dt>
        </dl>
      </Alert>
    </div>
  </span>
</template>

<script>
import { toolHelpers as tool } from "@/utils/tool-helpers";
import Alert from "@/components/layouts/Alert";

export default {
  name: "AlertDivs",
  props: {
    status: {
      required: true
    },
    error: {
      required: true
    },
    passwordInvalid: {
      required: true
    }
  },
  components: {
    Alert
  },
  methods: {
    cleanData(data) {
      return tool.cleanDataApi(data);
    }
  }
};
</script>
