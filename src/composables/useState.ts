import type { Ref } from 'vue'
import { ref } from 'vue'

export function useState<T>(initialValue: T): [Readonly<Ref<T>>, (payload: T) => void] {
  const refValue = ref<T>(initialValue) as Ref<T>
  const mutationFunction = (payload: T) => refValue.value = payload

  return [refValue, mutationFunction]
}
