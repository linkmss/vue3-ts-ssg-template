<script setup lang="ts">
import { computed } from 'vue'
import { useModal } from '@/composables/useModal'

const { activeModal, activeModalPayload, injectableModals, hide } = useModal()

const componentIs = computed(() => injectableModals.value.find(item => item.name === activeModal.value)?.component || '')
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="componentIs" class="fixed z-modal top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,.4)]" @click="hide">
        <component :is="componentIs" :key="activeModal" :payload="activeModalPayload" @click.stop @close="hide" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>

</style>
