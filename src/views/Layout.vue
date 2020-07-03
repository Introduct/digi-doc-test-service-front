<template>
  <div id="layout">
    <TheHeader />
    <div class="main-pane">
      <TheDescription />
      <TheLogic class="logic" />
      <p class="disclaimer">All data submitted/uploaded is deleted after 48 hours.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '../components/TheHeader.vue'
import TheDescription from '../components/TheDescription.vue'
import TheLogic from '../components/TheLogic.vue'

export default Vue.extend({
  components: {
    TheHeader,
    TheDescription,
    TheLogic,
  },
  data() {
    return {}
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";

#layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-pane {
  flex-grow: 1;
  padding-left: $margin-global;
  padding-bottom: 1rem;
  padding-top: 2em;
  background-color: $color-white;
  box-shadow: 0px -20px 20px rgba(0, 0, 0, 0.01);
  border-radius: 40px 40px 0px 0px;
}

.logic {
  margin-top: 3em;
}

.disclaimer {
  margin-top: 4.625em;
  text-align: center;
  font-weight: 600;
  opacity: 0.5;
}
</style>
