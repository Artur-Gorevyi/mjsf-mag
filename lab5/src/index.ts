import type { App } from 'vue'
import DocumentUploader from './components/DocumentUploader.vue'

export interface DocumentInterface {
  type: string
  icon: string
  name: string
}

export { DocumentUploader }

export type { DocumentInterface as Document }

const install = (app: App) => {
  app.component('DocumentUploader', DocumentUploader)
}

export default {
  install
}


