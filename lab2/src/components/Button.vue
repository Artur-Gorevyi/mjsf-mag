<template>
    <button
      :type="type"
      :disabled="disabled"
      :class="[
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses,
        colorClasses
      ]"
      @click="$emit('click', $event)"
    >
      <span v-if="hasIcon">
        <component v-if="isIconComponent" :is="icon" class="w-4 h-4" />
        <span v-else class="w-4 h-4 inline-block text-current" aria-hidden="true">{{ icon }}</span>
      </span>
  
      <span>{{ label }}</span>
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    label: { type: String, required: true },
    color: { 
      type: String, 
      default: 'blue',
      validator: (value) => ['red', 'blue', 'green', 'yellow', 'purple', 'gray'].includes(value)
    },
    size: { 
      type: String, 
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }, 
    icon: { type: [Object, Function, String], default: null },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
  })
  
  defineEmits(['click'])
  
  const sizeClasses = computed(() => {
    switch (props.size) {
      case 'small': return '!px-3 !py-1.5 !text-sm max-h-[25px]'
      case 'large': return '!px-6 !py-3 !text-lg min-h-[48px]'
      case 'medium': 
      default: return '!px-4 !py-2 !text-base min-h-[40px]'
    }
  })
  
  const colorMap = {
    red:    '!bg-red-500 !text-white hover:!bg-red-600 focus:ring-red-500',
    blue:   '!bg-blue-500 !text-white hover:!bg-blue-600 focus:ring-blue-500',
    green:  '!bg-green-500 !text-white hover:!bg-green-600 focus:ring-green-500',
    yellow: '!bg-yellow-500 !text-white hover:!bg-yellow-600 focus:ring-yellow-500',
    purple: '!bg-purple-500 !text-white hover:!bg-purple-600 focus:ring-purple-500',
    gray:   '!bg-gray-500 !text-white hover:!bg-gray-600 focus:ring-gray-500',
  }
  
  const colorClasses = computed(() => colorMap[props.color] ?? colorMap.blue)
  const hasIcon = computed(() => !!props.icon)
  const isIconComponent = computed(() => typeof props.icon === 'object' || typeof props.icon === 'function')
  </script>
  