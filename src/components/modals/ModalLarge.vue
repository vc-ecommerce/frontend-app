<template>

  <div
    :class="`modal fade ${targetClass}`"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" @click.prevent="reloadHandler()" class="modal-close" data-dismiss="modal" aria-label="Close">
            <i class="font-icon-close-2"></i>
          </button>
          <h4 class="modal-title" id="myModalLabel">{{ modalTitle }}</h4>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button @click.prevent="reloadHandler()" type="button" class="btn btn-rounded btn-default" data-dismiss="modal">
            <i class="glyphicon glyphicon-remove"></i> Fechar
          </button>
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </div>
  <!--.modal-->
</template>

<script>
export default {
  name: "ModalLarge",
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    targetClass: {
      default: "create-modal-lg"
    }
  },
  methods: {
    reloadHandler() {
      this.$eventHub.$emit("reloadHandler", true);
    }
  }
};
</script>
