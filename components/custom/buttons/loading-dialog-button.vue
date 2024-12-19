<script setup lang="ts">
type Props = {
  isLoading: boolean;
  onClick: () => Promise<void>;
  buttonText?: string;
  loadingText?: string;
};

const { isLoading = false, onClick, buttonText, loadingText } = defineProps<Props>();

// ------------------------------------------------------------------------------------------

const _isLoading = ref<boolean>(isLoading);

const handleClick = async () => {
  _isLoading.value = true;
  await onClick();
  _isLoading.value = false;
};
</script>

<template>
  <v-tooltip location="start" :text="buttonText">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-refresh"
        :disabled="isLoading"
        @click="handleClick"
        color="primary"
        size="small"
        aria-label="loading-dialog-button"
        class="text-none text-subtitle-1"
      />
      <v-dialog v-model="_isLoading" :min-width="300" :max-width="600" persistent>
        <section class="d-flex align-center justify-center">
          <v-progress-circular color="primary" indeterminate="disable-shrink" />
          <p class="text-h6 font-weight-bold ml-4">
            {{ loadingText }}
          </p>
        </section>
      </v-dialog>
    </template>
  </v-tooltip>
</template>
