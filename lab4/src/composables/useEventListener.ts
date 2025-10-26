import { onMounted, onUnmounted } from 'vue'

export function useEventListener<T extends keyof WindowEventMap>(
  event: T,
  handler: (event: WindowEventMap[T]) => void,
  target: Window | Document | HTMLElement = window
): void {
  onMounted(() => {
    target.addEventListener(event, handler as EventListener)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler as EventListener)
  })
}

