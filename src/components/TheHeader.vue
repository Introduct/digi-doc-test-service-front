<template>
  <div class="header">
    <div class="logo">
      <TheLogoIcon />
      <p>
        DigiDoc test
        <br />service
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheLogoIcon from './TheLogoIcon.vue'

export default Vue.extend({
  components: {
    TheLogoIcon,
  },
  props: {},
  data() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";

.logo {
  display: flex;
  align-items: center;
  margin-left: $margin-global;
  p {
    margin: 1em 0 1em 1em;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
  }
}
</style>
