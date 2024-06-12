<script setup lang="ts">
import { onMounted, ref, useAttrs, useSlots } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

const input = ref<HTMLInputElement | null>(null)

if (attrs?.autofocus)
  onMounted(() => input.value?.focus())
</script>

<template>
  <label class="relative w-full">
    <span v-if="slots.rightIcon" class="absolute right-3 top-1/2 -translate-y-1/2">
      <slot name="rightIcon" />
    </span>

    <input
      ref="input"
      type="text"
      :class="[
        $style.input,
        {
          'pr-10': slots.rightIcon,
        },
      ]"
      v-bind="attrs"
    >
  </label>
</template>

<style module lang="sass">
.input
  @apply disabled:border-cb-light disabled:bg-fill-light
  @apply hover:border-ct-disabled focus:border-primary
  @apply rounded-base h-[40px] px-4 w-full transition-all
  @apply bg-bg-base border border-cb-base text-ct-regular text-base placeholder-ct-placeholder

  &:invalid:not(:placeholder-shown)
    @apply border-error

  &:-webkit-autofill
    transition: background-color 0s 600000s, color 0s 600000s, border .3s linear
</style>
