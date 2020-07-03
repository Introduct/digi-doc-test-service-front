<template>
  <div class="file-item-root">
    <div class="icon-and-closer">
      <div></div>
      <svg
        class="file-icon"
        viewBox="0 0 36 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 2H6C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6V38C2 39.0609 2.42143 40.0783 3.17157 40.8284C3.92172 41.5786 4.93913 42 6 42H30C31.0609 42 32.0783 41.5786 32.8284 40.8284C33.5786 40.0783 34 39.0609 34 38V14M22 2L34 14M22 2V14H34M26 24H10M26 32H10M14 16H10"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <CloserIcon
        class="closer"
        @click="$emit('delete', file)"
      />
    </div>
    <div class="name">{{ namePrepared }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'
import CloserIcon from './CloserIcon.vue'

export default Vue.extend({
  components: {
    AppIcon,
    CloserIcon,
  },
  props: {
    file: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {}
  },
  created() { },
  computed: {
    namePrepared() {
      const maxLength = 10
      if (this.file.name.length <= maxLength) {
        return this.file.name
      }
      return this.file.name.substring(0, 6) + '…' + this.file.name.slice(-6)
    }
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";

.file-item-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 166px;
  height: 116px;
  background: rgba(78, 128, 255, 0.05);
  border: 2px solid rgba(78, 128, 255, 0.2);
  border-radius: 8px;
  color: $color-black;
  font-size: 1rem;
}

.icon-and-closer {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.file-icon {
  margin-top: 1em;
  stroke: $color-grey;
  width: 2em;
  margin-right: 2.1em; // todo
}

.name {
  margin-top: 1em;
}

.closer {
  justify-self: flex-end;
  margin-right: 0.4em;
  margin-top: 0.4em;
}
</style>
