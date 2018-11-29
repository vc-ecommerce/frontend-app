<template>
  <button @click.prevent="handler()"
    class="tabledit-edit-button btn btn-sm btn-default"
    data-toggle="modal"
    data-target=".bd-example-modal-lg">
    <i class="glyphicon glyphicon-pencil"></i>
  </button>
</template>

<script>
export default {
  name: "ModalButton",
  props: ['dataItem'],
  methods: {

    showModal() {
      this.$eventHub.$emit('showModal', true);
    },

    setItem() {
      if(this.dataItem) {
        this.$store.commit("setItem", this.dataItem);
      }
    },

    handler() {
      this.showModal();
      this.setItem();
    }

  }

}
</script>
