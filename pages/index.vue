<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";

// ------------------------------------------------------------------------------------------

const config = useRuntimeConfig();

const { t } = useTranslation();

const PAGE_TITLE = ref<string>(t("nav.home"));
</script>

<template>
  <layout-page-content-wrapper :show-page-title="false" :page-title="PAGE_TITLE">
    <!-- section 1 -->
    <section class="d-flex flex-column justify-center align-start">
      <h1 id="home-page-title" class="text-h2 text-md-h1 font-weight-black">
        <p>{{ t("pages-contents.home-page.section-1-title-1") }}</p>
        <p class="text-primary mt-1 mt-md-0">
          {{ t("pages-contents.home-page.section-1-title-2") }}
        </p>
      </h1>
      <v-chip variant="outlined" color="primary" class="mt-4 font-weight-black border-md">
        Version {{ config.public.appInfo.version }}
      </v-chip>
      <p class="w-100 text-subtitle-1 text-md-h5 mt-10 text-grey">
        {{ t("pages-contents.home-page.section-1-description") }}
      </p>
      <!-- <div class="text-center">
        <v-btn @click="handleClickToAccount">Let's Start</v-btn>
      </div> -->
    </section>
    <v-divider />

    <!-- section 2 -->
    <section class="d-flex flex-column justify-center align-center">
      <h1 id="home-page-title" class="text-h4 text-md-h3 font-weight-black">
        <p class="d-block d-sm-inline-block">
          {{ t("pages-contents.home-page.section-2-title-1") }}
        </p>
        <p class="d-block d-sm-inline-block text-secondary pl-0 pl-md-2">
          {{ t("pages-contents.home-page.section-2-title-2") }}
        </p>
      </h1>
      <p class="w-100 text-subtitle-1 text-md-h5 mt-10 pt-0 pt-md-10 text-grey">
        {{ t("pages-contents.home-page.section-2-description-1") }}
      </p>
      <p class="w-100 text-subtitle-1 text-md-h5 text-secondary font-weight-black mt-0 mt-md-4">
        {{ t("pages-contents.home-page.section-2-description-2") }}
      </p>
    </section>
    <v-divider />

    <!-- section 3 -->
    <!-- <section class="d-flex flex-column justify-center align-center">
        ...
      </section> -->
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
section {
  min-height: 100svh !important;
}

#home-page-title {
  letter-spacing: -2px !important;
  font-family:
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
}
</style>
