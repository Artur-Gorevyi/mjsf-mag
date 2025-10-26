<script setup>
import { ref, provide, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'underline',
    validator: (value) => ['underline', 'pills', 'boxed'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue'])

const tabs = ref([])

const tabsContainerClass = computed(() => {
  const base = 'flex gap-2 border-b border-gray-200 dark:border-gray-700'
  
  switch (props.variant) {
    case 'pills':
      return 'border-none'
    case 'boxed':
      return 'gap-1 border-none'
    default:
      return base
  }
})

function getTabButtonClass(slug) {
  const isActive = slug === props.modelValue
  
  if (props.variant === 'pills') {
    return [
      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
    ]
  }
  
  if (props.variant === 'boxed') {
    return [
      'px-4 py-2 rounded-t-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-white text-blue-600 border border-b-0 border-blue-600 dark:bg-gray-800 dark:text-blue-400'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400'
    ]
  }
  
  // underline variant (default)
  return [
    'px-4 py-2 border-b-2 text-sm font-medium transition-colors',
    isActive
      ? 'border-blue-600 text-blue-600'
      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
  ]
}

function setActiveTab(slug) {
  emit('update:modelValue', slug)
}

function registerTab(tab) {
  if (!tabs.value.find(t => t.slug === tab.slug)) {
    tabs.value.push(tab)
  }
}

function unregisterTab(slug) {
  const index = tabs.value.findIndex(t => t.slug === slug)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

provide('activeTab', computed(() => props.modelValue))
provide('registerTab', registerTab)
provide('unregisterTab', unregisterTab)
provide('setActiveTab', setActiveTab)
</script>

<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div :class="tabsContainerClass">
      <button
        v-for="tab in tabs"
        :key="tab.slug"
        :class="getTabButtonClass(tab.slug)"
        @click="setActiveTab(tab.slug)"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>