import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DocumentUploaderPlugin from './index.js'

const app = createApp(App)
app.use(DocumentUploaderPlugin)
app.mount('#app')
