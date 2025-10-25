<script setup>
import { ref } from 'vue'
import Button from './components/Button.vue'
import HelloWorld from './components/HelloWorld.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'

const clicks = ref(0)
const handleClick = () => {
  clicks.value++
  console.log('Button clicked')
}

// Demo data for SearchableDropdown
const fruits = [
  { label: '🍎 Яблуко', value: 'apple' },
  { label: '🍌 Банан', value: 'banana' },
  { label: '🍇 Виноград', value: 'grape' },
  { label: '🍓 Полуниця', value: 'strawberry' },
  { label: '🍍 Ананас', value: 'pineapple' },
  { label: '🥝 Ківі', value: 'kiwi' },
  { label: '🍑 Персик', value: 'peach' },
]

const selectedFruit = ref(null)
const selectedMany = ref([])
</script>

<template>
  <div>
    <HelloWorld />

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Тест кнопок</h2>
      <p class="text-sm opacity-70">Клікнуто: {{ clicks }}</p>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Button label="Blue medium" color="blue" @click="handleClick" />
        <Button label="Red medium" color="red" @click="handleClick" />
        <Button label="Gray small" size="small" color="gray" @click="handleClick" />
        <Button label="Green large" size="large" color="green" @click="handleClick" />
        <Button label="З іконкою" color="purple" :icon="'⍟'" @click="handleClick" />
        <Button label="Yellow" color="yellow" @click="handleClick" />
      </div>
    </section>

    <section class="mt-10 space-y-4 text-left">
      <h2 class="text-xl font-semibold">SearchableDropdown</h2>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="block text-sm font-medium">Один вибір</label>
          <SearchableDropdown
            v-model="selectedFruit"
            :items="fruits"
            placeholder="Оберіть фрукт"
          />
          <div class="text-sm opacity-70">Значення: {{ selectedFruit }}</div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium">Кілька значень</label>
          <SearchableDropdown
            v-model="selectedMany"
            :items="fruits"
            multiple
            placeholder="Оберіть фрукти"
          >
            <template #option="{ option, selected }">
              <span class="truncate" :class="selected ? 'font-semibold' : ''">{{ option.label }}</span>
            </template>
          </SearchableDropdown>
          <div class="text-sm opacity-70">Значення: {{ selectedMany }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
