<script setup lang="ts">
import { SelectableNoteType } from "~/utils/types";
import useTranslation from "~/composables/core/use-translation";
import useCreateNote from "~/composables/use-api/use-create-note";
import useAccount from "~/composables/use-account";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import customTiptapEditor from "~/components/custom/editor/custom-tiptap-editor.vue";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { account } = storeToRefs(useAccount());
const { isLoading, mutate } = useCreateNote();

const editorData = reactive<{ content: string }>({
  content: "",
});

async function createMockData() {
  await mutate({
    type: SelectableNoteType.RAFT,
    title: account.value?._id + "_" + Date.now(),
    message: editorData.content,
  });
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-create')">
    <v-sheet
      :elevation="4"
      class="py-4 px-4 py-md-10 px-md-8 flex-1-1 position-relative"
      style="background-color: transparent; backdrop-filter: blur(20px)"
    >
      <!-- editor -->
      <custom-tiptap-editor
        :text="editorData.content"
        :editable="true"
        @tiptap-editor-update="editorData.content = $event.html"
      />

      <!-- create button -->
      <v-fab
        size="large"
        :loading="isLoading"
        :disabled="isLoading"
        :absolute="true"
        :style="{ top: '40px', right: '16px' }"
        @click="createMockData"
      >
        {{ t("buttons.create") }}
      </v-fab>
    </v-sheet>
  </layout-page-content-wrapper>
</template>
