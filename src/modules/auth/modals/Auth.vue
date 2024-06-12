<script setup lang="ts">
import BaseModal from '@/components/Interface/BaseModal.vue'
import type { AuthModalPayload } from '@/modules/auth'
import { t } from '@/plugins/i18n'
import BaseInput from '@/components/Interface/BaseInput.vue'
import BaseButton from '@/components/Interface/BaseButton.vue'
import { useState } from '@/composables/useState'
import { useAuthMutation } from '@/modules/auth/composable/useAuthMutation'

interface Props {
  payload: AuthModalPayload
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const [type, setType] = useState<AuthModalPayload['type']>(props.payload.type)
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')

const authMutation = useAuthMutation({ type })

function onClose() {
  emit('close')
}
function onToggleType() {
  setType(type.value === 'signIn' ? 'signUp' : 'signIn')
}
async function onAuth() {
  await authMutation.mutateAsync({
    email: email.value,
    password: password.value,
  })

  if (authMutation.data.value?.status)
    onClose()
}
</script>

<template>
  <BaseModal :name="t(`auth.modal.title.${type}`)" @keydown.enter="onAuth" @close="onClose">
    <div class="flex flex-col gap-2">
      <BaseInput :value="email" :label="t('auth.modal.labels.login')" :placeholder="t(`auth.modal.placeholder.login`)" autofocus @input="setEmail" />
      <BaseInput :value="password" :label="t('auth.modal.labels.password')" :placeholder="t(`auth.modal.placeholder.password`)" @input="setPassword" />
    </div>

    <p class="text-ct-regular text-small text-center cursor-pointer" :class="authMutation.isPending.value && 'opacity-50 pointer-events-none'" @click="onToggleType">
      {{ t(`auth.modal.action.${type === 'signIn' ? 'haveNotRegisteredYet' : 'alreadyRegistered'}`) }}
    </p>

    <BaseButton type="primary" :disabled="authMutation.isPending.value" @click="onAuth">
      {{ t(`auth.modal.action.${type}`) }}
    </BaseButton>
  </BaseModal>
</template>

<style scoped>

</style>
