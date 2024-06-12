<script setup lang="ts">
import BaseModal from '@/components/Interface/BaseModal.vue'
import type { AuthModalPayload } from '@/modules/auth'
import { t } from '@/plugins/i18n'
import BaseInput from '@/components/Interface/BaseInput.vue'
import BaseButton from '@/components/Interface/BaseButton.vue'

interface Props {
  payload: AuthModalPayload
}

defineProps<Props>()
</script>

<template>
  <BaseModal :name="t(`auth.modal.title.${payload.type}`)">
    <div class="flex flex-col gap-2">
      <BaseInput :label="t('auth.modal.labels.login')" :placeholder="t(`auth.modal.placeholder.login`)" autofocus />
      <BaseInput :label="t('auth.modal.labels.password')" :placeholder="t(`auth.modal.placeholder.password`)" />
    </div>

    <BaseButton type="primary">
      {{ t(`auth.modal.action.${payload.type}`) }}
    </BaseButton>
  </BaseModal>
</template>

<style scoped>

</style>
