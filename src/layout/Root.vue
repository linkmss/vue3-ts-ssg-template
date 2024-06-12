<script setup lang="ts">
import LeftSidebar from '@/components/Layout/Sidebar/LeftSidebar.vue'
import RightSidebar from '@/components/Layout/Sidebar/RightSidebar.vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
</script>

<template>
  <div class="h-full flex flex-col text-white">
    <Header />

    <div class="flex flex-grow">
      <LeftSidebar v-if="false" />

      <div class="flex flex-col flex-grow">
        <div class="flex flex-grow">
          <slot />
        </div>

        <Footer />
      </div>

      <RightSidebar v-if="false" />
    </div>
  </div>
</template>

<style scoped>

</style>
