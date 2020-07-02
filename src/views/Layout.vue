<template>
  <div>
    <TheHeader />
    <div class="main-pane">
      <TheDescription />
      <TheLogic />
      <p class="disclaimer">All data submitted/uploaded is deleted after 48 hour.</p>
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

.main-pane {
  background-color: $color-white;
  box-shadow: 0px -20px 20px rgba(0, 0, 0, 0.01);
  border-radius: 40px 40px 0px 0px;
}

.disclaimer {
  font-weight: 600;
}
</style>
