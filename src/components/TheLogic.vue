<template>
  <div class="the-logic-root">
    <input
      ref="input"
      class="input"
      type="file"
      multiple
      @input="addFiles($event.target.files)"
    />
    <div>
      <button
        class="button"
        :disabled="signature"
        @click="clickInput"
      >
        <AppIcon icon="upload" />Upload file
      </button>
      <button
        class="button orange"
        :disabled="!files.length"
      >
        <AppIcon icon="sign" />Sign files
      </button>
    </div>
    <DropZone
      class="drop-zone"
      :files="files"
      :busy="status === 'uploading'"
      @input="addFiles($event)"
    />
    <button
      class="button main mt"
      :disabled="!signature"
    >
      <AppIcon icon="download" />Download
    </button>
    <button
      class="button mt"
      :disabled="!signature"
    >
      <AppIcon icon="link" />Generate link
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'
import DropZone from './DropZone.vue'
import { timeout } from '../lib/debug'

const enum Status {
  clean,
  uploading,
  uploaded,
}

export default Vue.extend({
  components: {
    AppIcon,
    DropZone,
  },
  props: {},
  data() {
    return {
      status: undefined,
      files: [],
      signature: undefined,
    }
  },
  created() { },
  computed: {},
  methods: {
    clickInput() {
      this.$refs.input.click()
    },
    async addFiles(files: FileList) {
      this.status = 'uploading'
      try {
        await timeout(1000)
        this.files.push(...files)
        console.log(this.files)
      } catch (e) {
      } finally {
        this.status = undefined
      }
    }
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
.the-logic-root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  display: none;
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
