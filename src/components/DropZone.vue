<template>
  <div class="drop-zone-root">Drop your files here</div>
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

.drop-zone-root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10em;
  font-weight: bold;
  font-size: 20px;
  border: 3px dashed $color-grey;
  border-radius: 5px;
  color: $color-grey;
}
</style>
