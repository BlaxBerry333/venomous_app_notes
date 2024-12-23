<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const PAGE_TITLE = ref<string>(t("nav.account-signin"));

// ------------------------------------------------------------------------------------------
</script>

<template>
  <layout-page-content-wrapper :page-title="PAGE_TITLE">
    <!-- ... -->
  </layout-page-content-wrapper>
</template>
