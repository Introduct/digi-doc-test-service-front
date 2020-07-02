<template>
  <div>
    <button class="button">
      <AppIcon icon="upload" />Upload file
    </button>
    <button class="button">
      <AppIcon icon="sign" />Sign files
    </button>
    <button class="button">
      <AppIcon icon="download" />Download
    </button>
    <button class="button">
      <AppIcon icon="link" />Generate link
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'

export default Vue.extend({
  components: {
    AppIcon,
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
