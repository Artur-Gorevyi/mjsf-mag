<script setup>
import { ref } from 'vue'
import '../style.css'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="card">
    <p class="text-3xl font-bold underline">
      Програмна інженерія, 2 курс, група 8.1214, Горевий Артур Андрійович
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
