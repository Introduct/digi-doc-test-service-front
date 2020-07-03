<template>
  <div
    class="closer"
    @click="$emit('click')"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M11 1L1 11M1 1L11 11"
        stroke="#0A092D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
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

.closer {
  width: 1em;
  height: 1em;
  background-color: $color-white;
  border-radius: 1em;
  padding: 0.35em;
  cursor: pointer;
  svg {
    margin-left: 0.16em; // todo
    margin-bottom: 0.05em;
  }
}
</style>
