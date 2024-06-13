<script setup lang="ts">
import SFoldIcon from '@/assets/icons/s-fold.svg'
import ChatDotRound from '@/assets/icons/chat-dot-round.svg'
import BaseButton from '@/components/Interface/BaseButton.vue'
import { useModal } from '@/composables/useModal'
import type { AuthModalPayload } from '@/modules/auth'
import { t } from '@/plugins/i18n'
import { useUser } from '@/modules/user'
import { useLogoutMutation } from '@/modules/auth/composable/useLogoutMutation'

const modalLayer = useModal()
const user = useUser()
const logoutMutation = useLogoutMutation()

function onOpenAuth(type: AuthModalPayload['type']) {
  modalLayer.show('auth', { type })
}
</script>

<template>
  <header class="py-4 pl-5 pr-5 screen-768:pr-7 bg-bg-overlay transition-all relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
    <div class="flex items-center justify-between h-10">
      <div class="flex items-center gap-5">
        <BaseButton class="hidden screen-768:block">
          <SFoldIcon class="w-6 h-6" />
        </BaseButton>

        <picture class="h-full w-auto">
          <source srcset="/images/logo-short@1x.png 1x, /images/logo-short@2x.png 2x" media="(max-width: 500px)">
          <img src="/images/logo-full@1x.png" srcset="/images/logo-full@2x.png 2x" alt="logo" loading="eager">
        </picture>
      </div>

      <div v-if="user.isLogged.value" class="flex gap-4">
        <span>
          {{ `Nickname: ${user.data.value?.name}` }}
        </span>

        <span class="cursor-pointer" :class="logoutMutation.isPending.value && 'pointer-events-none opacity-50'" @click="logoutMutation.mutateAsync">
          {{ 'Выйти' }}
        </span>
      </div>

      <div v-else-if="user.isIdentificationEnd.value" class="flex items-center gap-3">
        <BaseButton class="w-[90px] screen-480:w-[110px]" @click="() => onOpenAuth('signIn')">
          <span class="uppercase text-extra-small font-700">
            {{ t('header.button.signIn') }}
          </span>
        </BaseButton>

        <BaseButton type="primary" class="w-[120px] screen-480:w-[150px]" @click="() => onOpenAuth('signUp')">
          <span class="uppercase text-extra-small font-700">
            {{ t('header.button.signUp') }}
          </span>
        </BaseButton>

        <BaseButton class="hidden screen-768:block">
          <ChatDotRound class="w-6 h-6" />
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<style>

</style>
