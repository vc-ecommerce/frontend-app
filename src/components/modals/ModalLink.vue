<template>

<button v-on:click="fillDataStore()"  type="button"
    class="tabledit-edit-button btn btn-sm btn-default"> <i class="glyphicon glyphicon-pencil"></i>

</button>


</template>

<script>
export default {
  name: "ModalLink",
  props: {
    // showType: {
    //   type: String,
    //   default: "button"
    // },
    // showTypeClassName: {
    //   default: "btn btn-inline"
    // },
    // sizeModal: {
    //   type: String,
    //   default: ""
    // },
    idModalLink: {
      default: "myModal"
    },
    // classIcon: {
    //   type: String,
    //   required: true
    // },
    // titleLink: {
    //   type: String,
    //   required: false
    // },
    dataItem: {
      require: false
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    fillDataStore: function() {
      this.$store.commit("setItem", this.dataItem);
    }
  }
};
</script>
