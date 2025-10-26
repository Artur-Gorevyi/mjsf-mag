<script setup lang="ts">
import { useBreakpoints } from '@/composables/useBreakpoints'

const {
  width,
  isMobile,
  isTablet,
  isDesktop,
  greater,
  smaller,
  between,
} = useBreakpoints({
  mobile: 640,
  tablet: 960,
  desktop: 1280
})
</script>

<template>
  <div class="breakpoints-demo">
    <h1>Breakpoints Demo</h1>
    
    <div class="width-display">
      <p>📏 Ширина вікна: {{ width }}px</p>
    </div>

    <div class="device-indicator">
      <p v-if="isMobile" class="text-blue-600">📱 Мобільний</p>
      <p v-else-if="isTablet" class="text-green-600">📟 Планшет</p>
      <p v-else-if="isDesktop" class="text-purple-600">🖥 Десктоп</p>
      <p v-else class="text-orange-600">📐 Проміжний розмір</p>
    </div>

    <div class="function-tests">
      <h2>Функції перевірки</h2>
      
      <div class="test-results">
        <p>
          <span>greater("tablet")</span> → 
          <span :class="greater('tablet') ? 'text-green-600' : 'text-red-600'">
            {{ greater('tablet') }}
          </span>
        </p>
        <p>
          <span>smaller("desktop")</span> → 
          <span :class="smaller('desktop') ? 'text-green-600' : 'text-red-600'">
            {{ smaller('desktop') }}
          </span>
        </p>
        <p>
          <span>between("mobile", "desktop")</span> → 
          <span :class="between('mobile', 'desktop') ? 'text-green-600' : 'text-red-600'">
            {{ between('mobile', 'desktop') }}
          </span>
        </p>
      </div>
    </div>

    <div class="info-box">
      <h3>Поточні брейкпоінти:</h3>
      <p>mobile: 640px</p>
      <p>tablet: 960px</p>
      <p>desktop: 1280px</p>
    </div>
  </div>
</template>

<style scoped>
.breakpoints-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
}

.breakpoints-demo h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.breakpoints-demo h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.breakpoints-demo h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e3a52;
}

.breakpoints-demo p {
  margin: 0.5rem 0;
}

.width-display p { font-size: 1.125rem; font-weight: 600; }

.device-indicator {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.device-indicator p {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.function-tests { margin: 1.5rem 0; }

.test-results p {
  font-size: 0.875rem;
  color: #555;
  margin: 0.75rem 0;
}

.test-results span:first-child {
  font-weight: 600;
}

.info-box {
  background: #e8f4f8;
  border: 1px solid #b3d9e8;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.info-box p {
  color: #2c3e50;
  font-size: 0.875rem;
}

/* Color utilities */
.text-blue-600 { color: #2563eb; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.text-orange-600 { color: #ea580c; }
.text-red-600 { color: #dc2626; }
</style>

