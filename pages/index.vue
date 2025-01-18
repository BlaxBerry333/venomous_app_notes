<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import useRoutes from "~/composables/core/use-routes";
import useAccount from "~/composables/use-account";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import { PAGE_PATHNAME } from "~/utils/get-page-pathname";

// ------------------------------------------------------------------------------------------

const config = useRuntimeConfig();

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { navigateTo } = useRoutes();

const { isAuthenticated } = storeToRefs(useAccount());

const handleClickToAccount = () => {
  if (isAuthenticated) {
    navigateTo(PAGE_PATHNAME.noteList);
    return;
  }
  navigateTo(PAGE_PATHNAME.accountSignin);
};
</script>

<template>
  <layout-page-content-wrapper :show-page-title="false" :page-title="t('nav.home')">
    <!-- section 1 -->
    <section class="d-flex flex-column justify-center align-start">
      <!-- titles -->
      <h1 id="home-page-title" class="text-h2 text-sm-h1 font-weight-black">
        <p data-aos="fade-up" data-aos-delay="0">
          {{ t("pages-contents.home-page.section-1-title-1") }}
        </p>
        <p class="text-secondary mt-1 mt-md-0" data-aos="fade-up" data-aos-delay="100">
          {{ t("pages-contents.home-page.section-1-title-2") }}
        </p>
      </h1>
      <!-- version -->
      <v-chip
        variant="outlined"
        color="secondary"
        class="mt-4 font-weight-black"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Version {{ config.public.appInfo.version }}
      </v-chip>
      <!-- descriptions -->
      <p
        class="w-100 text-subtitle-1 text-sm-h6 text-md-h5 mt-10 text-grey"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {{ t("pages-contents.home-page.section-1-description") }}
      </p>
    </section>
    <v-divider />

    <!-- section 2 -->
    <section class="d-flex flex-column justify-center align-center">
      <!-- titles -->
      <h1
        id="home-page-title"
        class="text-h4 text-md-h3 font-weight-black mb-10"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        <p class="d-block d-sm-inline-block">
          {{ t("pages-contents.home-page.section-2-title-1") }}
        </p>
        <p class="d-block d-sm-inline-block text-secondary pl-0 pl-md-2">
          {{ t("pages-contents.home-page.section-2-title-2") }}
        </p>
      </h1>
      <!-- descriptions -->
      <div
        class="w-100 text-subtitle-1 text-sm-h6 text-md-h5 pt-0 pt-md-10 mb-6 text-grey"
        style="line-height: 160%"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <p>{{ t("pages-contents.home-page.section-2-description-1") }}</p>
        <p class="text-secondary">{{ t("pages-contents.home-page.section-2-description-2") }}</p>
      </div>
      <!-- actions -->
      <div class="w-100 py-4" data-aos="fade-up" data-aos-delay="200">
        <v-btn @click="handleClickToAccount">
          {{ t("pages-contents.home-page.section-2-navigation-button") }}
        </v-btn>
      </div>
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
