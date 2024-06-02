<script setup lang="ts">
import BaseModal from '@/components/Interface/BaseModal.vue'
import type { AuthModalPayload } from '@/modules/auth'

interface Props {
  payload: AuthModalPayload
}

defineProps<Props>()
</script>

<template>
  <BaseModal name="123" />
</template>

<style scoped>

</style>
