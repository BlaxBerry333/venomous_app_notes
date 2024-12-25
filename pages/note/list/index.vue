<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";

import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-list')">
    <section>...</section>
  </layout-page-content-wrapper>
</template>
