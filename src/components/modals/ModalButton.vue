<template>
  <button
    @click.prevent="handler()"
    :class="btnClass"
    data-toggle="modal"
    :data-target="targetClass"
  >
    <i :class="iconClass"></i> <span v-if="btnTitle">{{ btnTitle }}</span>
  </button>
</template>

<script>
export default {
  name: "ModalButton",
  props: {
    dataItem: {},
    btnClass: {
      default: "btn btn-inline"
    },
    iconClass: {
      default: "glyphicon glyphicon-plus"
    },
    btnTitle: {},
    targetClass: {
      default: ".create-modal-lg"
    }
  },
  methods: {
    showModal() {
      this.$eventHub.$emit("showModal", true);
    },

    setItem() {
      if (this.dataItem) {
        this.$store.commit("setItem", this.dataItem);
      }
    },

    handler() {
      this.showModal();
      this.setItem();
    }
  }
};
</script>
