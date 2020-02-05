<template lang="pug">
transition(name="fade",enter-active-class="fadeIn",leave-active-class="fadeOut")
  .page-load-wrapper(v-if="value")
    .bg
    .pg-content
      i.fa.fa-spinner
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.page-load-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  overflow: hidden;
}
.page-load-wrapper .bg,
.page-load-wrapper .pg-content {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.page-load-wrapper .bg {
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
}
.page-load-wrapper .pg-content {
  z-index: 10;
  color: #fff;
  text-align: center;
  padding-top: 40%;
}
.page-load-wrapper .pg-content i.fa {
  opacity: 0.9;
  font-size: 30px;
  animation: spin 2s linear;
  animation-iteration-count: infinite;
}
@media screen and (max-width: 450px) {
  .page-load-wrapper .pg-content {
    padding-top: calc(100% - 60px);
  }
}
</style>
