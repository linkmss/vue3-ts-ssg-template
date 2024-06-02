import { ref, shallowRef } from 'vue'
import type { Component, Ref, ShallowRef } from 'vue'
import type { ShowFunctionTypes } from '@/modules/modalLayerTypes'

export interface InjectableModal {
  name: string
  component: Component
}

interface BaseUseModal {
  injectableModals: ShallowRef<InjectableModal[]>
  activeModal: Ref<string>
  activeModalPayload: Ref<any>
  show: ShowFunctionTypes
  hide: () => void
}

const injectableModals = shallowRef<InjectableModal[]>([])
const activeModal = ref<string>('')
const activeModalPayload = ref<any>(null)
export function injectModal(name: string, component: Component) {
  injectableModals.value.push({ name, component })
}

export function useModal(): BaseUseModal {
  return {
    injectableModals,
    activeModal,
    activeModalPayload,
    show: (name, payload) => {
      activeModal.value = name
      activeModalPayload.value = payload
    },
    hide: () => {
      activeModal.value = ''
      activeModalPayload.value = null
    },
  }
}
