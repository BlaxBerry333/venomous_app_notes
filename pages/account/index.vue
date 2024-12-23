<script setup lang="ts">
import clsx from "clsx";

import useRoutes from "~/composables/core/use-routes";
import useAccount from "~/composables/use-account";
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import { PAGE_PATHNAME } from "~/utils/get-page-pathname";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const PAGE_TITLE = ref<string>(t("nav.account-profile"));

// ------------------------------------------------------------------------------------------

const { account, isAuthenticated } = useAccount();

const { navigateTo } = useRoutes();

watchEffect(() => {
  if (!isAuthenticated.value) {
    navigateTo(PAGE_PATHNAME.accountSignin, { replace: true });
  }
});
</script>

<template>
  <layout-page-content-wrapper :page-title="PAGE_TITLE">
    <section class="d-flex flex-column flex-md-row mb-10">
      <v-sheet
        border
        :elevation="4"
        :class="
          clsx(
            ' flex-0-1',
            'py-4 px-4 py-md-6 px-md-6',
            'd-flex flex-column flex-md-row',
            'justify-center align-center',
          )
        "
      >
        <v-avatar
          :rounded="50"
          :size="130"
          :image="account?.avatar"
          icon="mdi-account"
          color="grey"
          class="py-2 px-2 mb-2 mb-md-0 mr-md-6"
        />
        <section class="text-subtitle-1 font-weight-black">
          <p>{{ account?.displayName }}</p>
          <p>{{ account?.email }}</p>
        </section>
      </v-sheet>

      <v-sheet
        border
        :elevation="4"
        :class="clsx(' flex-1-1', 'd-flex', 'py-4 px-4 py-md-6 px-md-6', 'mt-2 mt-md-0 ml-md-6')"
      >
        Analytics...
      </v-sheet>
    </section>
  </layout-page-content-wrapper>
</template>
