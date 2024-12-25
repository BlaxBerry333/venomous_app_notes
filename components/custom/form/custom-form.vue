<script setup lang="ts">
import type { SubmitEventPromise } from "vuetify";

import type { CustomFormValidationResultType } from "./types";

const { handleSubmit } = defineProps<{
  readonly handleSubmit: (validationResult: CustomFormValidationResultType) => Promise<void>;
}>();

// ------------------------------------------------------------------------------------------

const isLoading = ref<boolean>(false);

async function submit(validateEvent: SubmitEventPromise) {
  isLoading.value = true;

  const validationResult = await validateEvent;
  await handleSubmit(validationResult);

  isLoading.value = false;
}
</script>

<template>
  <v-form ref="form" validate-on="invalid-input lazy" @submit.prevent="submit" class="w-100">
    <slot :isLoading="isLoading" />
  </v-form>
</template>
