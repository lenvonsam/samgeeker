<template lang="pug">
div
  transition(name="zoom",enter-active-class="zoomIn",leave-active-class="zoomOut")
    .modal.in(style="display:block", :key="1", v-if="value")
      .modal-dialog(role="dialog")
        .modal-content
          .modal-header(v-if="title.length > 0")
            h4.modal-title {{title}}
          .modal-body
            slot(name="body")
          .modal-footer
            slot(name="footer")
  .modal-backdrop.in(style="display: block", :key="2", v-if="value")
</template>

<script>
  export default {
    props: {
      value: {
        required: true
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
