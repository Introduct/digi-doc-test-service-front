<template>
  <div
    class="drop-zone-root"
    :class="{ 'drop-hovered': dropHovered }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @dragover.prevent
  >
    <FileItem
      v-for="(file, i) of files"
      class="file-item"
      :key="i"
      :name="file.name"
    />
    <p v-if="!files.length">Drop your files here</p>
    <div
      v-if="busy"
      class="busy-overlay"
    >
      Uploading
      <SpinnerIcon
        class="spinner"
        color="#EB905A"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileItem from './FileItem.vue'
import SpinnerIcon from './SpinnerIcon.vue'

export default Vue.extend({
  components: {
    FileItem,
    SpinnerIcon,
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
    busy: {
      type: Boolean,
      default: false,
    },
    signature: {
      type: Object,
      required: false,
    },
    validation: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dropHovered: false,
    }
  },
  created() { },
  computed: {},
  methods: {
    onDrop(e: DragEvent) {
      let files = [...e.dataTransfer.items]  // todo
        .filter(({ kind }) => kind === 'file')
        .map(x => x.getAsFile())

      this.dropHovered = false
      this.$emit('input', files)
    },
    onDragEnter() {
      this.dropHovered = true
    },
    onDragLeave() {
      this.dropHovered = false
    },
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";

.drop-zone-root {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 6em;
  padding: 1em;
  font-weight: bold;
  font-size: 20px;
  border: 3px dashed $color-grey;
  border-radius: 5px;
  color: $color-grey;
}
.drop-hovered {
  border-color: $color-black;
}
.file-item {
  margin: 0.5em;
}
.busy-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $color-orange;
  background-color: #fef9f6;
}
.spinner {
  width: 3em;
  margin-bottom: 1em;
}
</style>
