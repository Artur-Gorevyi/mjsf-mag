# Document Uploader Component Features

- **Drag & Drop Support** - Intuitive file upload via drag & drop
- **File Selection** - Click to browse and select files
- **Preview Support** - Preview uploaded files using `URL.createObjectURL`
- **Document Templates** - Display predefined documents with custom icons
- **Delete Functionality** - Remove uploaded or predefined documents
- **Max Files Limit** - Enforce maximum number of files
- **Beautiful UI** - Modern and responsive design
- **TypeScript Support** - Full TypeScript definitions included

## Installation

```bash
npm install @your-org/vue-document-uploader
```

## Usage

### Global Registration (Plugin)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import DocumentUploaderPlugin from '@your-org/vue-document-uploader'

const app = createApp(App)
app.use(DocumentUploaderPlugin)
app.mount('#app')
```

### Component Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'

const uploadedFiles = ref<File[]>([])
const availableDocuments = ref([
  { type: 'pdf', icon: '/icons/pdf.svg', name: 'Contract.pdf' },
  { type: 'docx', icon: '/icons/docx.svg', name: 'Report.docx' },
  { type: 'xlsx', icon: '/icons/xlsx.svg', name: 'Data.xlsx' }
])
</script>

<template>
  <DocumentUploader
    v-model="uploadedFiles"
    v-model:documents="availableDocuments"
    :maxFiles="5"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Array<File>` | `[]` | Array of uploaded files (v-model) |
| `documents` | `Array<Document>` | `[]` | Predefined documents to display |
| `maxFiles` | `number` | `10` | Maximum number of files allowed |

### Document Interface

```typescript
interface Document {
  type: string    // File type identifier (e.g., 'pdf', 'docx')
  icon: string    // URL or data URI for icon
  name: string   // Display name
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `update:modelValue` | `Array<File>` | Emitted when files are added or removed |
| `update:documents` | `Array<Document>` | Emitted when documents are removed |

## Examples

### Basic Upload

```vue
<template>
  <DocumentUploader v-model="files" :maxFiles="5" />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
</script>
```

### With Predefined Documents

```vue
<template>
  <DocumentUploader
    v-model="files"
    v-model:documents="documents"
    :maxFiles="10"
  />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
const documents = ref([
  { type: 'pdf', icon: 'data:image/...', name: 'Template.pdf' }
])
</script>
```

## Styling

The component includes default styles but can be customized using CSS variables or scoped styles.

### CSS Variables

```css
.document-uploader {
  --upload-zone-border-color: #ccc;
  --upload-zone-hover-color: #42b883;
  --document-preview-bg: white;
  --delete-btn-color: rgba(255, 0, 0, 0.8);
}
```
