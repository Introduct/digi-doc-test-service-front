<template>
  <Layout />
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from './views/Layout.vue'

export default Vue.extend({
  components: {
    Layout,
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
</style>
