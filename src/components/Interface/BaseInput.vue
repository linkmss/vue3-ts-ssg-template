<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'

type EventLocal = Event & { target: { value: string } }
interface Props {
  label?: string
  type?: 'text' | 'number' | 'password' | 'email'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})
const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'change', value: string): void
}>()
const slots = useSlots()
const attrs = useAttrs()

const extractValueFromEvent = (event: EventLocal) => event.target.value

const onEvent = (eventName: 'input' & 'change', event: EventLocal) => emit(eventName, extractValueFromEvent(event))
</script>

<template>
  <label class="flex flex-col gap-1">
    <span v-if="label" class="text-ct-regular text-base">
      {{ label }}
    </span>

    <span class="relative w-full">
      <span v-if="slots.rightIcon" class="absolute right-3 top-1/2 -translate-y-1/2">
        <slot name="rightIcon" />
      </span>

      <input
        :type="type"
        :class="[
          $style.input,
          {
            'pr-10': slots.rightIcon,
          },
        ]"
        v-bind="attrs"
        @input="onEvent.bind('input')"
        @change="onEvent.bind('change')"
      >
    </span>

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
