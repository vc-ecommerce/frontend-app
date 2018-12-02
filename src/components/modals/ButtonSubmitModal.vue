<template>
  <span>
    <button v-if="!ok" :form="form" type="submit" :disabled="btnDisabled" :class="bntClass">
      <span v-if="!btnDisabled">
        <i :class="iconClass"></i>
        {{ bntTitle }}
      </span>
      <span v-else>Enviando...</span>
    </button>

    <button v-else @click.prevent="reloadHandler()" data-dismiss="modal" :class="bntClass">
      <i :class="iconClass"></i>
      <span v-if="ok">Concluído</span>
    </button>
  </span>
</template>

<script>
export default {
  name: "ButtonSubmitModal",
  props: {
    form: {
      required: true
    },
    bntClass: {
      type: String,
      default: "btn btn-rounded btn-primary"
    },
    bntTitle: {
      required: true,
      default: "Salvar Dados"
    },
    btnDisabled: {
      required: true
    },
    ok: {
      required: true,
      default: false
    },
    iconClass: {
      default: "glyphicon glyphicon-ok"
    }
  },
  methods: {
    reloadHandler() {
      this.$eventHub.$emit("showModal", false);
      this.$eventHub.$emit("reloadHandler", true);
    }
  }
};
</script>
