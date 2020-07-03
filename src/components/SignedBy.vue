<template>
  <div
    class="signedby-root"
    :class="classes"
  >
    <template v-if="signature.valid">
      <p>Signature valid</p>
      <svg
        width="30"
        height="21"
        viewBox="0 0 30 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 10.6745L10.7539 19L28 2"
          stroke="#27CA2D"
          stroke-width="3"
          stroke-linejoin="round"
        />
      </svg>
    </template>
    <template v-else>
      <p>Signature invalid</p>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.6668 2.33325L2.3335 15.6666M2.3335 2.33325L15.6668 15.6666"
          stroke="#EC3C3C"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
    <p class="foo any text">{{ signedByText }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'

export default Vue.extend({
  components: {
    AppIcon,
  },
  props: {
    signature: {
      type: Object,
      required: false,
    },
  },
  computed: {
    classes() {
      if (this.signature.valid) {
        return ['valid']
      }
      return ['invalid']
    },
    signedByText() {
      let datetime = new Date(this.signature.signedOn) as Date
      let date = [
        datetime.getDate(),
        datetime.getMonth() + 1,
        datetime.getFullYear(),
      ].map(x => x.toString().padStart(2, '0')).join('.')

      let time = [
        datetime.getHours(),
        datetime.getMinutes(),
        datetime.getSeconds(),
      ].map(x => x.toString().padStart(2, '0')).join(':')

      return `Signed by ${this.signature.signerFirstName} ${this.signature.signerLastName}`
        + ` (${this.signature.signerIdCode}) on ${date} at ${time}`
    },
  },
})

</script>

<style scoped lang="scss">
@import "@/styles/includes";

.signedby-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 3em;
  }
  &.valid {
    background-color: $color-green-background;
  }
  &.invalid {
    background-color: $color-red-background;
  }

  .text {
    font-weight: 600;
    font-size: 0.875rem;
    color: opacify($color: $color-grey, $amount: 0.3); // todo: check figma
  }
}

.valid {
  svg {
    stroke: $color-green;
  }
  p {
    color: $color-green;
  }
}
.invalid {
  svg {
    stroke: $color-red;
  }
  p {
    color: $color-red;
  }
}
</style>
