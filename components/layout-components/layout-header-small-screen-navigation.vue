<script setup lang="ts">
import clsx from "clsx";

import useTranslation from "~/composables/core/use-translation";
import useRoutes from "~/composables/core/use-routes";
import useNavItems from "~/composables/use-navigation-menu";

// ------------------------------------------------------------------------------------------

const smallScreenDrawerIsOpen = inject<Ref<boolean>>("smallScreenDrawerIsOpen", ref(false));

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const { checkIsCurrentPathname, navigateTo } = useRoutes();

const { navigationItems } = useNavItems();

// ------------------------------------------------------------------------------------------

const isMounted = ref<boolean>(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <v-navigation-drawer
    v-if="isMounted"
    v-model="smallScreenDrawerIsOpen"
    temporary
    location="right"
    :width="250"
    class="d-flex d-md-none"
    style="background-color: transparent; backdrop-filter: blur(20px)"
  >
    <v-list nav class="py-2 px-2">
      <v-list-item
        v-for="item in navigationItems"
        :key="item.to"
        :value="item.to"
        @click="navigateTo(item.to)"
        class="py-4 px-4 mb-2"
      >
        <template v-slot:prepend>
          <v-icon
            :icon="item.icon"
            size="large"
            :color="checkIsCurrentPathname(item.to) ? 'secondary' : undefined"
          />
        </template>
        <v-list-item-title
          :class="
            clsx(
              'text-subtitle-2 font-weight-black',
              checkIsCurrentPathname(item.to) && 'text-secondary',
            )
          "
        >
          {{ t(item.label) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
