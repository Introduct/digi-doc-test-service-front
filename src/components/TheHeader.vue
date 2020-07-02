<template>
  <div>
    <TheLogo />DigiDoc Test service
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheLogo from './TheLogo.vue'

export default Vue.extend({
  components: {
    TheLogo
  },
  props: {},
  data() {
    return {}
  },
  created() { },
  computed: {},
  methods: {},
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
</style>
