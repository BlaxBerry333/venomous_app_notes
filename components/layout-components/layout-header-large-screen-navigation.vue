<script setup lang="ts">
import clsx from "clsx";

import useTranslation from "~/composables/core/use-translation";
import useRoutes from "~/composables/core/use-routes";
import useNavItems from "~/composables/use-navigation-menu";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const { checkIsCurrentPathname, navigateTo } = useRoutes();

const { isAuthenticated } = storeToRefs(useAccount());

const { navigationItems } = useNavItems();

// ------------------------------------------------------------------------------------------

const isMounted = ref<boolean>(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <v-list
    v-if="isAuthenticated && isMounted"
    nav
    class="h-100 d-none d-md-flex align-center ml-6 px-0 py-0"
    style="background-color: transparent; backdrop-filter: blur(10px)"
  >
    <v-list-item
      v-for="item in navigationItems"
      :key="item.to"
      :value="item.to"
      @click="navigateTo(item.to)"
      style="transition: all 0.5s; min-width: 100px"
      :class="
        clsx(
          'py-0 px-2 mb-0 mx-1 text-subtitle-2 font-weight-black text-center',
          checkIsCurrentPathname(item.to) && 'text-secondary',
        )
      "
    >
      {{ t(item.label) }}

      <div
        v-if="checkIsCurrentPathname(item.to)"
        class="bg-secondary w-100 position-absolute left-0 right-0"
        style="bottom: -6px; height: 2px"
      />
    </v-list-item>
  </v-list>
</template>

<style lang="scss">
.v-list-item--variant-text .v-list-item__overlay {
  background-color: transparent !important;
}
</style>
