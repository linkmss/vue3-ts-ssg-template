<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
const emit = defineEmits(['close'])

const onClose = () => emit('close')
</script>

<template>
  <div class="bg-bg-overlay rounded-big p-5 min-w-[320px] flex flex-col gap-5">
    <slot name="header">
      <div class="flex items-center gap-2 justify-between">
        <span class="text-white text-16 leading-12 font-700">
          {{ name }}
        </span>

        <div class="w-4 h-4 text-ct-secondary hover:text-primary cursor-pointer transition" @click="onClose">
          {{ 'close icon' }}
        </div>
      </div>
    </slot>

    <slot />
  </div>
</template>

<style scoped>

</style>
