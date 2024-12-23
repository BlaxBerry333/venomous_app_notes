<script setup lang="ts">
import type { ReturnType } from "~/server/api/notes/create.post";
import { SelectableNoteType } from "~/utils/types";

import useTranslation from "~/composables/core/use-translation";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const isLoading = ref<boolean>(false);

async function createMockData() {
  isLoading.value = true;

  try {
    await $fetch<ReturnType>(`/api/notes/create`, {
      method: "post",
      body: {
        type: SelectableNoteType.raft,
        title: "xxxxx" + new Date().toISOString(),
        message: "xxxxx" + new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating mock data:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <v-sheet id="pages-create">
    <section class="d-flex align-center justify-space-between">
      <!-- page title -->
      <h3 class="text-h5 font-weight-bold">
        {{ t("nav.create") }}
      </h3>

      <!-- placeholder -->
    </section>

    <section class="py-10">
      <v-btn
        :loading="isLoading"
        class="flex-grow-1"
        height="48"
        variant="tonal"
        @click="createMockData"
      >
        {{ t("buttons.create") + " Mock Data" }}
      </v-btn>
    </section>
  </v-sheet>
</template>
