<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <footer
    style="height: 60px"
    class="d-flex align-center justify-center text-caption text-md-body-2 text-grey"
  >
    <span>{{ `Copyright © ${new Date().getFullYear()}` }}</span>
    <span class="text-primary mx-1 font-weight-black">{{ config.public.appInfo.author }}</span>
    <span>All rights reserved.</span>
  </footer>
</template>
