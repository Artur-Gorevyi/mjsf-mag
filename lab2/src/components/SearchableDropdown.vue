<template>
  <div ref="rootEl" class="relative w-full">
    <div class="flex items-center gap-2">
      <input
        ref="inputEl"
        :placeholder="placeholder"
        class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700"
        :value="inputDisplay"
        :readonly="!isOpen && !editableWhenClosed"
        :disabled="disabled"
        @focus="open"
        @input="onInput"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="selectHighlighted()"
        @keydown.esc.prevent="close()"
      />
      <button
        v-if="showClear"
        type="button"
        class="shrink-0 rounded-lg border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="clearSelection"
      >Очистити</button>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
      role="listbox"
    >
      <template v-if="filteredOptions.length">
        <div
          v-for="(opt, idx) in filteredOptions"
          :key="optionKey(opt, idx)"
          :class="[
            'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm',
            idx === highlightedIndex ? 'bg-blue-50 dark:bg-slate-800' : '',
          ]"
          @mouseenter="highlightedIndex = idx"
          @mousedown.prevent="selectOption(opt)"
          role="option"
          :aria-selected="isSelected(opt)"
        >
          <slot name="option" :option="opt" :index="idx" :active="idx === highlightedIndex" :selected="isSelected(opt)">
            <span class="truncate">{{ optionLabel(opt) }}</span>
          </slot>
          <span v-if="isSelected(opt)" class="ml-auto text-blue-600">✓</span>
        </div>
      </template>
      <div v-else class="px-3 py-2 text-sm text-gray-500">Нічого не знайдено</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: [Array, String, Number, Object, Boolean, null], default: null },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Виберіть…' },
  labelKey: { type: String, default: 'label' },
  valueKey: { type: String, default: 'value' },
  disabled: { type: Boolean, default: false },
  editableWhenClosed: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change', 'select', 'clear'])

const isOpen = ref(false)
const query = ref('')
const highlightedIndex = ref(0)
const inputEl = ref(null)
const rootEl = ref(null)

const normalized = computed(() => {
  return (props.items || []).map((it) => {
    if (['string', 'number', 'boolean'].includes(typeof it)) {
      return { label: String(it), value: it, original: it }
    }
    return {
      label: it?.[props.labelKey] ?? '',
      value: it?.[props.valueKey] ?? it,
      original: it,
    }
  })
})

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return normalized.value
  return normalized.value.filter((o) => o.label.toLowerCase().includes(q))
})

const selectedArray = computed({
  get() {
    if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : []
    return props.modelValue == null ? [] : [props.modelValue]
  },
  set(val) {
    const out = props.multiple ? val : (val[0] ?? null)
    emit('update:modelValue', out)
    emit('change', out)
  },
})

const selectedLabels = computed(() => {
  const values = selectedArray.value
  const map = new Map(normalized.value.map((o) => [o.value, o.label]))
  return values
    .map((v) => map.get(v) ?? String(v))
    .filter(Boolean)
})

const inputDisplay = computed(() => {
  if (isOpen.value) return query.value
  return selectedLabels.value.join(', ')
})

const showClear = computed(() => selectedArray.value.length > 0 && !props.disabled)

function optionKey(opt, idx) {
  return opt.value ?? idx
}

function optionLabel(opt) {
  return opt.label
}

function isSelected(opt) {
  return selectedArray.value.some((v) => isEqual(v, opt.value))
}

function isEqual(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return a === b
  }
}

function open() {
  if (props.disabled) return
  isOpen.value = true
  highlightedIndex.value = 0
}

function close() {
  isOpen.value = false
  query.value = ''
}

function onInput(e) {
  query.value = e.target.value
  isOpen.value = true
  highlightedIndex.value = 0
}

function move(delta) {
  if (!filteredOptions.value.length) return
  const next = highlightedIndex.value + delta
  const max = filteredOptions.value.length - 1
  highlightedIndex.value = Math.max(0, Math.min(max, next))
}

function selectHighlighted() {
  const opt = filteredOptions.value[highlightedIndex.value]
  if (opt) selectOption(opt)
}

function selectOption(opt) {
  const value = opt.value
  if (props.multiple) {
    const exists = selectedArray.value.some((v) => isEqual(v, value))
    const next = exists
      ? selectedArray.value.filter((v) => !isEqual(v, value))
      : [...selectedArray.value, value]
    selectedArray.value = next
    emit('select', value)
  } else {
    selectedArray.value = [value]
    emit('select', value)
    close()
    // Return focus to input to mirror native select behavior
    requestAnimationFrame(() => inputEl.value?.focus())
  }
}

function clearSelection() {
  selectedArray.value = []
  emit('clear')
  // Keep dropdown open for further selection
  requestAnimationFrame(() => inputEl.value?.focus())
}

function onDocumentClick(e) {
  if (!rootEl.value) return
  if (!rootEl.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentClick)
})

watch(
  () => props.modelValue,
  () => {
    // Ensure displayed text updates when value changes from parent
    if (!isOpen.value) query.value = ''
  }
)
</script>