<script setup lang="ts">
const toggleSmallScreenDrawer = inject(
  "toggleSmallScreenDrawer",
  ref(() => {}),
);
</script>

<template>
  <v-btn
    :width="48"
    :height="48"
    style="min-width: 0"
    class="d-flex d-md-none align-center justify-center"
    icon="mdi-menu"
    @click.stop="toggleSmallScreenDrawer"
  />
</template>
