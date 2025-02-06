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

// ------------------------------------------------------------------------------------------

const isLogoutLoading = ref<boolean>(false);
const isEmpty = computed<boolean>(() => !account.account);

async function handleLogout() {
  isLogoutLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await account.handleLogout();
  isLogoutLoading.value = false;
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('pages-contents.account-profile-page.title')">
    <section v-if="isLogoutLoading" class="flex-1-1">
      <v-progress-linear color="primary" indeterminate />
    </section>

    <section
      v-if="!isLogoutLoading && !isEmpty"
      class="d-flex flex-column flex-md-row mb-4 mb-md-6"
    >
      <!-- Mobile 小尺寸屏幕 -->
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
        <section class="w-100 d-flex flex-column justify-center align-center d-md-none mt-2">
          <!-- display_name -->
          <p class="text-h6 font-weight-black text-truncate" style="max-width: 300px">
            {{ account.account?.display_name }}
          </p>
          <!-- email -->
          <p class="text-grey mt-0 text-truncate" style="max-width: 300px">
            {{ account.account?.email }}
          </p>
          <!-- role -->
          <p class="text-grey my-4 text-truncate" style="max-width: 300px">
            <v-chip size="small" variant="elevated" color="primary">
              {{ t(`pages-contents.account-profile-page.role.${account.account?.role}`) }}
            </v-chip>
          </p>
          <!-- created_at & updated_at -->
          <div class="text-grey">
            <p class="text-caption">
              <strong id="account-profile-page-strong-label">
                {{ t("pages-contents.account-profile-page.created-at") }}
              </strong>
              {{ $dayjs(account.account?.created_at).format("YYYY/MM/DD HH:mm") }}
            </p>
            <p class="text-caption">
              <strong id="account-profile-page-strong-label">
                {{ t("pages-contents.account-profile-page.updated-at") }}
              </strong>
              {{ $dayjs(account.account?.updated_at).format("YYYY/MM/DD HH:mm") }}
            </p>
          </div>
        </section>
      </v-sheet>

      <!-- PC 大尺寸屏幕 -->
      <v-sheet
        border
        :elevation="6"
        class="flex-1-1 d-none d-md-flex flex-column justify-space-between align-start py-md-6 px-md-6 ml-md-6"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        <section class="w-100">
          <!-- display_name -->
          <p class="text-h5 font-weight-black text-truncate" style="max-width: 600px">
            {{ account.account?.display_name }}
          </p>
          <!-- email -->
          <p class="text-subtitle-1 text-grey text-truncate" style="max-width: 600px">
            {{ account.account?.email }}
          </p>
          <!-- role -->
          <p class="text-grey mb-2 text-truncate" style="max-width: 300px">
            <v-chip size="x-small" variant="elevated" color="primary">
              {{ t(`pages-contents.account-profile-page.role.${account.account?.role}`) }}
            </v-chip>
          </p>
        </section>
        <section class="w-100 d-flex align-center justify-space-between">
          <!-- created_at & updated_at -->
          <div class="text-subtitle-1 text-grey">
            <p class="text-caption">
              <strong id="account-profile-page-strong-label">
                {{ t("pages-contents.account-profile-page.created-at") }}
              </strong>
              {{ $dayjs(account.account?.created_at).format("YYYY/MM/DD HH:mm") }}
            </p>
            <p class="text-caption">
              <strong id="account-profile-page-strong-label">
                {{ t("pages-contents.account-profile-page.updated-at") }}
              </strong>
              {{ $dayjs(account.account?.updated_at).format("YYYY/MM/DD HH:mm") }}
            </p>
          </div>
          <v-btn color="error" @click="account.handleLogout">
            {{ t("buttons.logout") }}
          </v-btn>
        </section>
      </v-sheet>
    </section>

    <section v-if="!isLogoutLoading && !isEmpty">
      <v-sheet
        border
        :elevation="6"
        class="flex-1-1 d-flex py-4 px-4 py-md-6 px-md-6 mb-4 mb-md-6"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        Analytics...
      </v-sheet>
    </section>

    <section v-if="!isLogoutLoading && !isEmpty" class="d-block d-md-none">
      <v-btn color="error" @click="handleLogout" class="w-100">
        {{ t("buttons.logout") }}
      </v-btn>
    </section>
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
#account-profile-page-strong-label {
  display: inline-block;
  text-align: center;
  width: 80px;
}
</style>
