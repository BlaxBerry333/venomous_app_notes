<script setup lang="ts">
import useRoutes from "~/composables/core/use-routes";

// ------------------------------------------------------------------------------------------

const { navigateTo } = useRoutes();

function navigateToHome(): void {
  navigateTo("/");
}
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="navigateToHome">
    <v-img
      :width="50"
      :height="50"
      src="~/assets/images/logo.webp"
      lazy-src="~/assets/images/logo.webp"
      cover
      aspect-ratio="16/9"
      draggable="false"
    />
  </div>
</template>
