# Lab 4: useBreakpoints Composable

Реалізація composable `useBreakpoints` для відстеження брейкпоінтів у Vue 3 з TypeScript.

## 📋 Функціональність

### ✅ Реалізовані вимоги

1. **Відстеження ширини вікна**
   - Реактивне значення `width`, що відображає поточну ширину вікна браузера
   - Computed значення `isMobile`, `isTablet`, `isDesktop` для стандартних брейкпоінтів

2. **Підписка на подію resize**
   - Використовується окремий composable `useEventListener` для підписки на `resize`
   - Забезпечує автоматичне оновлення `width` при зміні розміру вікна

3. **Кастомні брейкпоінти**
   - Можливість передавати об'єкт кастомних брейкпоінтів
   - Значення за замовчуванням: `mobile: 768px`, `tablet: 1024px`, `desktop: 1440px`

4. **Перевірка за іменем брейкпоінта**
   - `greater(name)` – ширина >= брейкпоінту
   - `smaller(name)` – ширина < брейкпоінту
   - `between(min, max)` – ширина між двома брейкпоінтами

## 🛠 Технічні деталі

- **TypeScript** з суворим типуванням
- **Composition API** (`ref`, `computed`, `onMounted`, `onUnmounted`)
- Підписка на події через `useEventListener`
- Чистий composable без прив'язки до конкретного компонента

## 📦 Структура проекту

```
lab4/
├── src/
│   ├── composables/
│   │   ├── useEventListener.ts    # Composable для підписки на події
│   │   └── useBreakpoints.ts      # Основний composable для брейкпоінтів
│   ├── components/
│   │   └── BreakpointsDemo.vue    # Демо-компонент
│   ├── App.vue
│   └── main.ts
├── tsconfig.json                   # Конфігурація TypeScript
├── vite.config.ts                  # Конфігурація Vite
└── package.json
```

## 🚀 Запуск проекту

```bash
npm install
npm run dev
```

## 💡 Приклад використання

```vue
<script setup lang="ts">
import { useBreakpoints } from "@/composables/useBreakpoints"

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
```

```vue
<template>
  <div class="p-4">
    <p>📏 Ширина вікна: {{ width }}px</p>

    <p v-if="isMobile">📱 Мобільний</p>
    <p v-else-if="isTablet">📟 Планшет</p>
    <p v-else-if="isDesktop">🖥 Десктоп</p>

    <hr class="my-4" />

    <p>greater("tablet") → {{ greater("tablet") }}</p>
    <p>smaller("desktop") → {{ smaller("desktop") }}</p>
    <p>between("mobile", "desktop") → {{ between("mobile","desktop") }}</p>
  </div>
</template>
```

### ⚠️ Нотатка про брейкпоінти

Зверніть увагу, що всі три computed значення (`isMobile`, `isTablet`, `isDesktop`) можуть бути `false` одночасно, якщо ширина вікна знаходиться між брейкпоінтами (наприклад, між `tablet` і `desktop`). У таких випадках слід використовувати функції `greater()`, `smaller()` або `between()` для більш точного контролю.

## 🎨 API Reference

### useBreakpoints(breakpoints?)

**Параметри:**
- `breakpoints?` - Об'єкт з кастомними брейкпоінтами (необов'язково)

**Повертає:**
- `width` - Ref з поточною шириною вікна
- `isMobile` - Computed, true якщо ширина < mobile
- `isTablet` - Computed, true якщо ширина >= mobile і < tablet
- `isDesktop` - Computed, true якщо ширина >= desktop
- `greater(name)` - Функція для перевірки, чи ширина >= брейкпоінту
- `smaller(name)` - Функція для перевірки, чи ширина < брейкпоінту
- `between(min, max)` - Функція для перевірки, чи ширина між двома брейкпоінтами
