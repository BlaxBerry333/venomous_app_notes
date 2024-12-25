<script setup lang="ts">
import usePageMeta from "~/composables/core/use-page-meta";

// ------------------------------------------------------------------------------------------

const { pageTitle = "", showPageTitle = true } = defineProps<{
  pageTitle: string;
  showPageTitle?: boolean;
}>();

// ------------------------------------------------------------------------------------------

usePageMeta({ pageTitle: pageTitle });
</script>

<template>
  <div class="w-100 h-100 position-relative">
    <!-- page title -->
    <section v-if="showPageTitle" class="my-4">
      <h3 class="text-h5 font-weight-black">{{ pageTitle }}</h3>
    </section>

    <!-- page content -->
    <slot />
  </div>
</template>
