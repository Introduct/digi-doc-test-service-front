<template>
  <div class="the-logic-root">
    <input
      ref="input"
      class="input"
      type="file"
      multiple
      @change="addFiles($event.target.files)"
    />
    <div>
      <button
        class="button"
        :disabled="container || busy"
        @click="clickInput"
      >
        <AppIcon icon="upload" />Upload file
      </button>
      <button
        class="button orange"
        :disabled="!files.length || busy"
        @click="sign"
      >
        <AppIcon icon="sign" />Sign files
      </button>
    </div>
    <DropZone
      class="drop-zone"
      :files="files"
      :status="status"
      :disabled="busy"
      :signature="signature"
      @input="addFiles($event)"
      @delete="deleteFile($event)"
    />
    <button
      class="button main mt"
      :disabled="!container || busy"
      @click="download"
    >
      <AppIcon icon="download" />Download
    </button>
    <button
      class="button mt"
      :disabled="!container || busy"
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
      signature: undefined,
    }
  },
  created() { },
  computed: {
    busy() {
      return ['uploading', 'signing', 'deleting'].includes(this.status)
    },
  },
  methods: {
    clickInput() {
      this.$refs.input.click()
    },
    async addFiles(files: FileList) {
      this.status = 'uploading'
      try {
        for (let file of files) {
          let res = await api.uploadFile(file)
          this.files.push(res)
        }
      } catch (e) {
        console.error(e)
        this.reportError(e)
      } finally {
        this.status = undefined
      }
      this.$refs.input.value = ''
    },
    async deleteFile(file) {
      this.status = 'deleting'
      try {
        await api.deleteFile(file.id)
        // await timeout(5000)
        this.files = this.files.filter(x => x.id !== file.id)
      } catch (e) {
        console.error(e)
        this.reportError(e)
      } finally {
        this.status = undefined
      }
    },
    async sign() {
      this.status = 'signing'
      try {
        await timeout(1000)
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
        this.signature = await api.get('containers', [this.container.id, 'validate'])
      } catch (e) {
        this.reportError(e)
        // todo
      } finally {
        this.status = undefined
      }
    },
    download() {
      window.location.assign(api.getContainerDownloadLink(this.container))
    },
    async generateLink() {
      try {

      } catch (e) {
        console.error(e)
        this.reportError(e)
      } finally {
        this.status = undefined
      }
    },
    reportError(e) {
      console.error(e)
      let message = e?.response?.data.message
        || e.message
        || JSON.stringify(e)

      this.$toasted.show(`Error: ${message}`, {
        type: 'error',
        duration: 10000,
        theme: 'bubble',
      })
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
