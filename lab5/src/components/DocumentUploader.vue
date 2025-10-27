<template>
  <div class="document-uploader">
    <div
      class="upload-zone"
      :class="{ 'drag-over': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="handleClickUpload"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        class="file-input"
        @change="handleFileSelect"
      />
      <div class="upload-icon">📁</div>
      <p class="upload-text">
        {{ isDragging ? 'Відпустіть файли тут' : 'Перетягніть файли сюди або натисніть для вибору' }}
      </p>
      <p class="upload-hint">
        Максимум {{ maxFiles }} {{ maxFiles === 1 ? 'файл' : 'файлів' }}
      </p>
    </div>

    <div class="documents-grid">
      <div
        v-for="(file, index) in modelValue"
        :key="`uploaded-${index}`"
        class="document-preview"
      >
        <div class="document-image">
          <img :src="getImagePreview(file)" alt="Preview" />
        </div>
        <div class="document-info">
          <p class="document-name" :title="file.name">{{ file.name }}</p>
          <p class="document-size">{{ formatFileSize(file.size) }}</p>
        </div>
        <button
          class="delete-btn"
          @click="removeUploadedFile(index)"
          type="button"
        >
          ✕
        </button>
      </div>

      <div
        v-for="(doc, index) in modelDocuments"
        :key="`doc-${doc.type}-${index}`"
        class="document-preview"
      >
        <div class="document-image">
          <img :src="doc.icon" :alt="doc.name" />
        </div>
        <div class="document-info">
          <p class="document-name" :title="doc.name">{{ doc.name }}</p>
          <p class="document-type">{{ doc.type.toUpperCase() }}</p>
        </div>
        <button
          class="delete-btn"
          @click="removeDocument(index)"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  documents: {
    type: Array,
    default: () => []
  },
  maxFiles: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['update:modelValue', 'update:documents'])

const fileInput = ref(null)
const isDragging = ref(false)

const canAddMore = computed(() => props.modelValue.length < props.maxFiles)

const modelDocuments = computed({
  get: () => props.documents,
  set: (value) => emit('update:documents', value)
})

function handleDragOver(event) {
  isDragging.value = true
  event.preventDefault()
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(event) {
  isDragging.value = false
  if (!canAddMore.value) return

  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

function handleClickUpload() {
  if (!canAddMore.value) return
  fileInput.value?.click()
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files)
  addFiles(files)
  event.target.value = ''
}

function addFiles(files) {
  const remainingSlots = props.maxFiles - props.modelValue.length
  const filesToAdd = files.slice(0, remainingSlots)
  
  if (filesToAdd.length === 0) return

  const updatedFiles = [...props.modelValue, ...filesToAdd]
  emit('update:modelValue', updatedFiles)
}

function removeUploadedFile(index) {
  const updatedFiles = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', updatedFiles)
}

function removeDocument(index) {
  const updatedDocs = modelDocuments.value.filter((_, i) => i !== index)
  emit('update:documents', updatedDocs)
}

function getImagePreview(file) {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDlIMTJWMTJIMTNWN1oiIGZpbGw9IiM2NjYiLz4KPHBhdGggZD0iTTEwIDEySDJMMTIgMkgxMFYxMloiIGZpbGw9IiM2NjYiLz4KPC9zdmc+'
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
</script>

<style scoped>
.document-uploader {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.upload-zone {
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  margin-bottom: 30px;
}

.upload-zone:hover {
  border-color: #42b883;
  background: #f0f9f7;
}

.upload-zone.drag-over {
  border-color: #42b883;
  background: #e8f5f2;
  transform: scale(1.02);
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
  font-weight: 500;
}

.upload-hint {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.document-preview {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.document-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.document-image {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.document-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.document-info {
  margin-top: 10px;
}

.document-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.document-size,
.document-type {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: rgba(255, 0, 0, 1);
}

.delete-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .documents-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .upload-zone {
    padding: 30px 20px;
  }
  
  .upload-text {
    font-size: 16px;
  }
}
</style>

