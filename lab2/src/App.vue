<script setup>
import { ref } from 'vue'
import Button from './components/Button.vue'
import HelloWorld from './components/HelloWorld.vue'

const clicks = ref(0)
const handleClick = () => {
  clicks.value++
  console.log('Button clicked')
}
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
