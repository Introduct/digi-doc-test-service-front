<template>
  <div class="the-logic-root">
    <div>
      <button class="button">
        <AppIcon icon="upload" />Upload file
      </button>
      <button class="button">
        <AppIcon icon="sign" />Sign files
      </button>
    </div>
    <DropZone class="drop-zone" />
    <button class="button mt">
      <AppIcon icon="download" />Download
    </button>
    <button class="button mt">
      <AppIcon icon="link" />Generate link
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'
import DropZone from './DropZone.vue'

export default Vue.extend({
  components: {
    AppIcon,
    DropZone,
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
.the-logic-root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drop-zone {
  width: 70%;
  margin-top: 1.5em;
}
.button {
  margin: 0 1.5rem;
}
.mt {
  margin-top: 2em;
}
</style>
