import { Component } from 'vue'

export interface Document {
  type: string
  icon: string
  name: string
}

export interface DocumentUploaderProps {
  modelValue: File[]
  documents: Document[]
  maxFiles: number
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DocumentUploader: Component<DocumentUploaderProps>
  }
}

export {}

