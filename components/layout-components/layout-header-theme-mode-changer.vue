<script setup lang="ts">
import useThemeMode from "~/composables/core/use-theme-mode";

// ------------------------------------------------------------------------------------------

const { isDarkModeTheme, toggleTheme } = useThemeMode();
</script>

<template>
  <v-btn
    :width="48"
    :height="48"
    style="min-width: 0"
    class="d-flex align-center justify-center rounded-lg"
    :icon="isDarkModeTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    @click="toggleTheme"
    color="secondary"
  />
</template>
