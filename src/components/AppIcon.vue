<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="app-icon"
  >
    <component :is="iconSubcomponent" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
// todo: require.context
import IconClose from './icons/IconClose.vue'
import IconCopy from './icons/IconCopy.vue'
import IconDownload from './icons/IconDownload.vue'
import IconFile from './icons/IconFile.vue'
import IconLink from './icons/IconLink.vue'
import IconRefresh from './icons/IconRefresh.vue'
import IconReload from './icons/IconReload.vue'
import IconSign from './icons/IconSign.vue'
import IconUpload from './icons/IconUpload.vue'

export default Vue.extend({
  components: {
    IconClose,
    IconCopy,
    IconDownload,
    IconFile,
    IconLink,
    IconRefresh,
    IconReload,
    IconSign,
    IconUpload,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() { },
  computed: {
    iconSubcomponent() {
      return 'Icon' + this.icon[0].toUpperCase() + this.icon.substring(1).toLowerCase()
      // return () => import(`@/components/${this.componentName}.vue`)
    }
  },
  methods: {},
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
</style>
