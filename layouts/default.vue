<script setup lang="ts">
import useThemeCustomSetting from "~/composables/core/use-theme-custom-setting";

import layoutHeaderLogo from "~/components/layout-components/layout-header-logo.vue";
import layoutHeaderThemeModeChanger from "~/components/layout-components/layout-header-theme-mode-changer.vue";
import layoutHeaderThemeLanguageChanger from "~/components/layout-components/layout-header-theme-language-changer.vue";
import layoutHeaderLargeScreenNavigation from "~/components/layout-components/layout-header-large-screen-navigation.vue";
import layoutHeaderSmallScreenNavigation from "~/components/layout-components/layout-header-small-screen-navigation.vue";
import layoutHeaderSmallScreenNavigationButton from "~/components/layout-components/layout-header-small-screen-navigation-button.vue";
import layoutFooter from "~/components/layout-components/layout-footer.vue";

// ------------------------------------------------------------------------------------------

useThemeCustomSetting();

// ------------------------------------------------------------------------------------------

const smallScreenDrawerIsOpen = ref<boolean>(false);

function toggleSmallScreenDrawer(): void {
  smallScreenDrawerIsOpen.value = !smallScreenDrawerIsOpen.value;
}

provide("smallScreenDrawerIsOpen", smallScreenDrawerIsOpen);
provide("toggleSmallScreenDrawer", toggleSmallScreenDrawer);

// ------------------------------------------------------------------------------------------
</script>

<template>
  <NuxtRouteAnnouncer />

  <v-app>
    <!-- layout header -->
    <v-app-bar
      flat
      :height="60"
      :elevation="4"
      class="position-sticky top-0"
      style="background-color: transparent; backdrop-filter: blur(10px)"
    >
      <v-container class="fill-height py-0 px-2 px-md-0">
        <layout-header-logo />
        <layout-header-large-screen-navigation />
        <v-spacer />
        <layout-header-theme-language-changer />
        <layout-header-theme-mode-changer />
        <layout-header-small-screen-navigation-button />
      </v-container>
    </v-app-bar>

    <layout-header-small-screen-navigation />

    <!-- layout main content -->
    <v-main class="pt-0">
      <v-container
        class="fill-height position-relative py-0 px-4 pt-4 d-flex flex-column justify-start align-start"
      >
        <div
          :style="{
            height: '100%',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }"
        >
          <!-- each page -->
          <slot />
        </div>

        <div
          id="background"
          :style="{
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: '20%',
            right: '-50%',
            zIndex: 0,
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            filter: 'blur(20rem)',
            opacity: 0.5,
            background: 'linear-gradient(to right, #00bfa5, #00bcd4)',
          }"
        />
      </v-container>
    </v-main>

    <!-- layout footer -->
    <layout-footer />
  </v-app>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

body {
  min-width: 390px;
}

html,
body {
  overscroll-behavior: none; /* 防止拖动弹性效果（ iOS 特有问题 ） */
}
</style>
