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
        :disabled="!files.length || busy || signature"
        @click="sign"
      >
        <AppIcon icon="sign" />Sign files
      </button>
    </div>
    <div class="drop-zone">
      <DropZone
        class
        :files="files"
        :status="status"
        :disabled="busy"
        :signature="signature"
        @input="addFiles($event)"
        @delete="deleteFile($event)"
      />
      <AppIcon
        v-if="files.length"
        class="refresh-button"
        icon="refresh"
        @click.native="reset"
      />
    </div>
    <button
      class="button main mt"
      :disabled="!container || busy"
      @click="download"
    >
      <AppIcon icon="download" />Download
    </button>
    <button
      v-if="shortLink"
      class="button mt"
      :disabled="!container || busy"
      @click="copyLink"
    >
      <AppIcon icon="copy" />
      {{ shortLink }}
    </button>
    <button
      v-else
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
  data: createInitialData,
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
        this.files = this.files.filter(x => x.id !== file.id)
      } catch (e) {
        this.reportError(e)
      } finally {
        this.status = undefined
      }
    },
    async sign() {
      this.status = 'signing'
      try {
        let certificate = await hwcrypto.getCertificate({
          lang: 'en',
        })
        let signData = await api.post('signing-data', {
          certificateInHex: certificate.hex,
          fileIds: this.files.map(x => x.id),
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
      window.location.assign(api.getContainerDownloadLink(this.container.id))
    },
    async generateLink() {
      try {
        await timeout(2000)
        this.shortLink = 'foo'
      } catch (e) {
        this.reportError(e)
      } finally {
        this.status = undefined
      }
    },
    async copyLink() {
      await navigator.clipboard.writeText(this.link)
    },
    reset() {
      Object.assign(this.$data, createInitialData())
    },
    reportError(e) {
      console.error(e)
      let message = e?.response?.data?.errors?.[0]?.message
        || e?.response?.data.message
        || e.message
        || e.errorMessage
        || JSON.stringify(e)

      this.$toasted.show(`Error: ${message}`, {
        type: 'error',
        duration: 10000,
        position: 'bottom-center',
      })
    },
  },
})

function createInitialData() {
  return {
    status: undefined,
    files: [],
    container: undefined,
    signature: undefined,
    shortLink: undefined,
  }
}

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
  position: relative;
}
.button {
  margin: 0 1.5rem;
}
.mt {
  margin-top: 2em;
}
.refresh-button {
  position: absolute;
  width: 1.2em;
  top: 0;
  right: -1.8em;
  cursor: pointer;
}
</style>
