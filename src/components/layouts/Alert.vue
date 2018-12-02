<template>
  <div :class="defineCol">
    <div :class="alertClass" role="alert" class="text-left">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    col: {
      type: Number,
      default: 12
    },
    alertClass: {
      type: String,
      required: true
    },
  },
  computed: {
    defineCol() {
      return `col-lg-${this.col}`;
    }
  }
};
</script>
