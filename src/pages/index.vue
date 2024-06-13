<script setup lang="ts">
import { useUser } from '@/modules/user'

const userQuery = useUser()
</script>

<template>
  <div class="text-cb-dark">
    {{ userQuery.data.value }}
  </div>
</template>
