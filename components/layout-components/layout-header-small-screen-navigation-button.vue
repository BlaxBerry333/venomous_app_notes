<script setup lang="ts">
import useAccount from "~/composables/use-account";

const toggleSmallScreenDrawer = inject(
  "toggleSmallScreenDrawer",
  ref(() => {}),
);

const { isAuthenticated } = storeToRefs(useAccount());
</script>

<template>
  <v-btn
    v-if="isAuthenticated"
    :width="48"
    :height="48"
    style="min-width: 0"
    class="d-flex d-md-none align-center justify-center text-secondary"
    icon="mdi-menu"
    @click.stop="toggleSmallScreenDrawer"
  />
</template>
