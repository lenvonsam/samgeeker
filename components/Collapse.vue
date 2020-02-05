<template lang="pug">
.panel-group(role="tablist", aria-expanded="false", aria-multiselectable="true", :id="accordionId", v-if="collapseArray.length > 0")
  .panel(v-for="(itm,idx) in collapseArray", :class="'panel-'+type")
    .panel-heading(role="tab", :id="accordionId + 'h' + idx")
      h4.panel-title
        a(role="button", data-toggle="collapse", :data-parent="'#' + accordionId", :href="'#' + accordionId + 'rp' + idx", :aria-expanded="idx > 0 ? 'true' : 'false'", :aria-controls="accordionId + 'rp' + idx") {{itm.title}}
    .panel-collapse.collapse(role="tabpanel", :aria-labelledby="accordionId + 'h' + idx", :id="accordionId + 'rp' + idx")
      .panel-body(v-html="itm.content")
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    collapseArray: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      accordionId: ''
    }
  },
  beforeMount () {
    console.log('beforeMount')
    this.accordionId = this.getAccordionId()
  },
  methods: {
    getAccordionId () {
      let d = new Date()
      return 'acd' + d.getTime()
    }
  }
}
</script>