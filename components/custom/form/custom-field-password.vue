<script setup lang="ts">
import type { CustomFormFieldRulesType } from "./types";

// ------------------------------------------------------------------------------------------

const { label, rules, isDisabled, classNames } = defineProps<{
  readonly label: string;
  readonly rules?: CustomFormFieldRulesType;
  readonly isDisabled?: boolean;
  readonly classNames?: string;
}>();

const model = defineModel<string>();

// ------------------------------------------------------------------------------------------

const showPassword = ref<boolean>(false);
</script>

<template>
  <v-text-field
    v-model="model"
    :label="label"
    :rules="rules"
    :disabled="isDisabled"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    variant="outlined"
    density="comfortable"
    color="primary"
    @click:append-inner="showPassword = !showPassword"
    :class="classNames || 'mb-4'"
  />
</template>
