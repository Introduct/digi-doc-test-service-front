<template>
  <div class="the-logic-root">
    <input
      ref="input"
      class="input"
      type="file"
      multiple
      @input="addFiles($event.target.files)"
    />
    <div>
      <button
        class="button"
        :disabled="container"
        @click="clickInput"
      >
        <AppIcon icon="upload" />Upload file
      </button>
      <button
        class="button orange"
        :disabled="!files.length"
        @click="sign"
      >
        <AppIcon icon="sign" />Sign files
      </button>
    </div>
    <DropZone
      class="drop-zone"
      :files="files"
      :busy="status === 'uploading'"
      @input="addFiles($event)"
    />
    <button
      class="button main mt"
      :disabled="!container"
      @click="download"
    >
      <AppIcon icon="download" />Download
    </button>
    <button
      class="button mt"
      :disabled="!container"
      @click="generateLink"
    >
      <AppIcon icon="link" />Generate link
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIcon from './AppIcon.vue'
import DropZone from './DropZone.vue'
import { timeout } from '../lib/debug'
import { api } from '../lib/api'
import { hwcrypto } from '@/lib/3rdparty/hwcrypto'



export default Vue.extend({
  components: {
    AppIcon,
    DropZone,
  },
  props: {},
  data() {
    return {
      status: undefined,
      files: [],
      container: undefined,
      validation: undefined,
    }
  },
  created() { },
  computed: {
  },
  methods: {
    clickInput() {
      this.$refs.input.click()
    },
    async addFiles(files: FileList) {
      this.status = 'uploading'
      try {
        for (let file of files) {
          this.files.push(await api.uploadFile(file))
        }
        console.log(this.files)
      } catch (e) {
        console.error(e)
        // todo
      } finally {
        this.status = undefined
      }
    },
    async sign() {
      this.status = 'signing'
      try {
        let certificate = await hwcrypto.getCertificate()
        let signData = await api.post('signing-data', {
          certInHex: certificate.hex,
          fileIds: this.files.map(x => x.id)
        })
        let signature = await hwcrypto.sign(certificate, {
          type: 'SHA-256',
          hex: signData.signatureInHex,
        }, {
          lang: 'en',  // todo: remove?
        })
        this.container = await api.post(`containers`, {
          signingDataId: signData.id,
          signatureInHex: signature.hex,
        })
        this.validation = await api.get('containers', [this.container.id, 'validate'])
      } catch (e) {
        console.error(e)
        // todo
      } finally {
        this.status = undefined
      }
    },
    download() {
      window.location.assign(api.getContainerDownloadLink(this.container))
    },
    async generateLink() {

    },
  },
})
</script>

<style scoped lang="scss">
@import "@/styles/includes";
.the-logic-root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  display: none;
}
.drop-zone {
  width: 70%;
  margin-top: 1.5em;
}
.button {
  margin: 0 1.5rem;
}
.mt {
  margin-top: 2em;
}
</style>
