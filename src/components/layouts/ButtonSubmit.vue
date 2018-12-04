<template>
  <button type="submit" :disabled="btnDisabled" :class="bntClass">
    <span v-if="!btnDisabled">
      <span v-if="iconClass"><i :class="iconClass"></i> </span>
      <span v-if="ok">
        Concluído
      </span>
      <span v-else>
        {{ bntTitle }}
      </span>
    </span>
    <span v-else>
      Enviando...
    </span>
  </button>
</template>

<script>
export default {
  name: "ButtonSubmit",
  props: {
    bntClass: {
      type: String,
      default: "btn btn-inline"
    },
    bntTitle: {
      required: true,
      default: "Salvar"
    },
    btnDisabled: {
      required: true
    },
    ok: {
      required: true,
      default: false
    },
    iconClass: {
      default: false
    }
  }
};
</script>
