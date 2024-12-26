<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import useCreateNoteApi from "~/composables/use-api/use-create-note-api";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import { SelectableNoteType } from "~/utils/types";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { isLoading, mutate } = useCreateNoteApi();

async function createMockData() {
  await mutate({
    type: SelectableNoteType.raft,
    title: "xxxxx" + new Date().toISOString(),
    message: "xxxxx" + new Date().toISOString(),
  });
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-create')">
    <section>...</section>

    <section>
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
  </layout-page-content-wrapper>
</template>
