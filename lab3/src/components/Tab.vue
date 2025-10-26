<script setup>
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

const activeTab = inject('activeTab')
const registerTab = inject('registerTab')
const unregisterTab = inject('unregisterTab')

const isActive = computed(() => activeTab.value === props.slug)

onMounted(() => {
  if (registerTab) {
    registerTab({
      title: props.title,
      slug: props.slug
    })
  }
})

onBeforeUnmount(() => {
  if (unregisterTab) {
    unregisterTab(props.slug)
  }
})
</script>

<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>