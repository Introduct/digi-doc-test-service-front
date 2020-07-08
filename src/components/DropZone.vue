<template>
  <div
    class="drop-zone-root"
    :class="classes"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @dragover.prevent
  >
    <div
      v-if="status"
      class="overlay busy"
    >
      <span class="status">{{ status }}</span>
      <SpinnerIcon
        class="spinner"
        color="#EB905A"
      />
    </div>
    <SignedBy
      v-else-if="signature"
      class="overlay"
      :signature="signature"
    />
    <p v-else-if="!files.length">Drop your files here</p>
    <div
      v-else
      class="file-list"
    >
      <FileItem
        v-for="(file, i) of files"
        :key="i"
        class="file-item"
        :file="file"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileItem from './FileItem.vue'
import SpinnerIcon from './SpinnerIcon.vue'
import SignedBy from './SignedBy.vue'

export default Vue.extend({
  components: {
    FileItem,
    SpinnerIcon,
    SignedBy,
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    signature: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      dropHovered: false,
    }
  },
  computed: {
    classes() {
      return {
        'drop-hovered': this.dropHovered,
        'borderless': status || this.signature,
        'forced-height': !this.files.length || this.status || this.signature,
      }
    },
  },
  methods: {
    onDrop(e: DragEvent) {
      if (!this.disabled) {
        let files = [...e.dataTransfer.items]  // todo
          .filter(({ kind }) => kind === 'file')
          .map(x => x.getAsFile())

        this.dropHovered = false
        this.$emit('input', files)
      }
    },
    onDragEnter() {
      if (!this.disabled) {
        this.dropHovered = true
      }
    },
    onDragLeave() {
      if (!this.disabled) {
        this.dropHovered = false
      }
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
  min-height: 6em;
  padding: 1em;
  font-weight: bold;
  font-size: 20px;
  border: 3px dashed $color-grey;
  border-radius: 5px;
  color: $color-grey;
  &.borderless {
    border-color: rgba(0, 0, 0, 0);
  }
  &.forced-height {
    height: 136px; // todo
  }
}
.file-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.drop-hovered {
  border-color: $color-black;
}
.file-item {
  margin: 0.5em;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.busy {
    color: $color-orange;
    background-color: #fef9f6;
  }
}
.spinner {
  width: 3em;
  margin-top: 1em;
}
.status {
  text-transform: capitalize;
}
</style>
