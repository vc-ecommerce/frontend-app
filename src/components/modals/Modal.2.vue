<template>
  <div class="modal fade"
					 id="myModal"
					 tabindex="-1"
					 role="dialog"
					 aria-labelledby="myModalLabel"
					 aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
									<i class="font-icon-close-2"></i>
								</button>
								<h4 class="modal-title" id="myModalLabel">Modal title</h4>
							</div>
							<div class="modal-body">
								<slot></slot>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-rounded btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div><!--.modal-->
</template>

<script>
export default {
  name: "Modal",
  props: {
    idModal: {
      default: "create"
    },
    sizeModal: {
      type: String,
      default: ""
    },
    titleModal: {
      type: String,
      required: true
    }
  }
};
</script>
