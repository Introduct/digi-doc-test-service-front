<template>
  <div>
    <p class="title">Testing the ability to sign documents with an ID Card</p>
    <div class="instructions">
      <p>
        1. Click the
        <strong>Upload file</strong> button and select document you wish to sign.
        <br />You can also drag files to the drop area to start uploading.
      </p>
      <p>
        2. Click the
        <strong>Sign file</strong> button to sign your file.
        <br />After that the file is ready to download.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
.title {
  font-size: 26px;
  font-weight: 600;
}
.instructions {
  border-left: 2px solid $color-violet;
  padding-left: 1em;
  p {
    line-height: 24px;
    padding-right: 2em;
  }
}
</style>
