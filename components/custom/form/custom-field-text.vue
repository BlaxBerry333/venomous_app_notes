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
</script>

<template>
  <v-text-field
    v-model="model"
    :label="label"
    :rules="rules"
    :disabled="isDisabled"
    variant="outlined"
    density="comfortable"
    color="primary"
    :class="classNames || 'mb-4'"
  />
</template>
