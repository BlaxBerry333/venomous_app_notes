<script setup lang="ts">
import useRoutes from "~/composables/core/use-routes";
import useAccount from "~/composables/use-account";
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import { PAGE_PATHNAME } from "~/utils/get-page-pathname";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const account = useAccount();

const { navigateTo } = useRoutes();

watchEffect(() => {
  if (!account.isAuthenticated) {
    navigateTo(PAGE_PATHNAME.accountSignin, { replace: true });
  }
});
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.account-profile')">
    <section class="d-flex flex-column flex-md-row mb-4 mb-md-6">
      <v-sheet
        border
        :elevation="6"
        class="flex-0-1 d-flex flex-column flex-md-row justify-center align-center py-4 px-4 py-md-6 px-md-6"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        <v-img
          cover
          :width="130"
          :height="130"
          :src="account.account?.avatar"
          :lazy-src="account.account?.avatar"
          aspect-ratio="16/9"
          draggable="false"
          class="rounded-circle cursor-pointer border-md"
        />
        <section class="d-block d-md-none">
          <p class="text-subtitle-1 font-weight-black">{{ account.account?.displayName }}</p>
          <p class="text-grey">{{ account.account?.email }}</p>
        </section>
      </v-sheet>

      <v-sheet
        border
        :elevation="6"
        class="flex-1-1 d-none d-md-flex flex-column justify-space-between align-start py-md-6 px-md-6 ml-md-6"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        <section>
          <p class="text-h5 font-weight-black">{{ account.account?.displayName }}</p>
          <p class="text-subtitle-1 text-grey">{{ account.account?.email }}</p>
        </section>
        <v-btn color="error" @click="account.handleLogout">
          {{ t("buttons.logout") }}
        </v-btn>
      </v-sheet>
    </section>

    <section>
      <v-sheet
        border
        :elevation="6"
        class="flex-1-1 d-flex py-4 px-4 py-md-6 px-md-6 mb-4 mb-md-6"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        Analytics...
      </v-sheet>
    </section>

    <section class="d-block d-md-none">
      <v-btn color="error" @click="account.handleLogout" class="w-100">
        {{ t("buttons.logout") }}
      </v-btn>
    </section>
  </layout-page-content-wrapper>
</template>
