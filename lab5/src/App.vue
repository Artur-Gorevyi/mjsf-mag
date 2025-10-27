<script setup>
import { ref, watch } from 'vue'
import DocumentUploader from './components/DocumentUploader.vue'

const uploadedFiles = ref([])
const documents = ref([])
  
watch(documents, (newDocs) => {
  console.log('Documents updated:', newDocs)
}, { deep: true })
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Document Uploader Demo</h1>
      <p>Завантажте файли через drag & drop або клік</p>
    </header>
    
    <DocumentUploader
      v-model="uploadedFiles"
      v-model:documents="documents"
      :maxFiles="5"
    />

    <div class="info-section">
      <h3>Завантажені файли: {{ uploadedFiles.length }}</h3>
      <ul v-if="uploadedFiles.length > 0">
        <li v-for="(file, index) in uploadedFiles" :key="index">
          {{ file.name }} ({{ formatFileSize(file.size) }})
        </li>
      </ul>
      <p v-else class="empty-state">Файли ще не завантажені</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-header p {
  font-size: 1.1em;
  opacity: 0.9;
}

.info-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-top: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin-top: 0;
  color: #333;
}

.info-section ul {
  list-style-type: none;
  padding: 0;
}

.info-section li {
  padding: 8px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 4px;
  color: #333;
}

.empty-state {
  color: #999;
  font-style: italic;
}
</style>
