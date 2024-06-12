<script setup lang="ts">
interface Props {
  type?: 'default' | 'primary'
}

withDefaults(defineProps<Props>(), {
  type: 'default',
})
</script>

<template>
  <button class="rounded-base h-10 min-w-[40px] p-2 flex items-center justify-center transition whitespace-nowrap cursor-pointer" :class="$style[type]">
    <slot />
  </button>
</template>

<style module lang="sass">
.default
  @apply bg-transparent text-ct-regular hover:text-primary border border-cb-base hover:bg-primary-l-9 hover:border-primary-l-7 active:border-primary

.primary
  @apply bg-primary text-white hover:bg-primary-l-3 active:bg-primary-d-2
</style>
