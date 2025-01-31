<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import useGetNoteData from "~/composables/use-api/use-get-note-data";
import customTiptapEditor from "~/components/custom/editor/custom-tiptap-editor.vue";
import useUpdateNote from "~/composables/use-api/use-update-note";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const { params } = useRoute();
const noteId = computed<string>(() => params.id as string);

// ------------------------------------------------------------------------------------------

const { data, isEmpty } = useGetNoteData({ noteId: noteId.value });

const { mutate: updateAsync, isLoading: isUpdating } = useUpdateNote({ noteId: noteId.value });

// ------------------------------------------------------------------------------------------

const editorData = reactive<{ content: string }>({
  content: "",
});

async function handleUpdate() {
  await updateAsync({
    message: editorData.content,
  });
}
</script>

<template>
  <layout-page-content-wrapper
    :page-title="t('pages-contents.note-detail-page.title')"
    :show-page-title="false"
  >
    <section v-if="!isEmpty" class="mb-4 mb-md-6">
      <v-sheet
        :elevation="4"
        class="py-4 px-4 py-md-10 px-md-8"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        <!-- <h3 class="text-h6 font-weight-black mb-2 mb-md-4">
          {{ data?.title }}
        </h3> -->
        <div class="d-flex flex-column flex-md-row">
          <p class="text-caption text-md-subtitle-2 font-weight-black text-grey mr-4">
            <strong id="note-detail-page-strong-label">
              {{ t("pages-contents.note-detail-page.created-at") }}
            </strong>
            {{ $dayjs(data?.created_at).format("YYYY/MM/DD HH:mm") }}
          </p>
          <p class="text-caption text-md-subtitle-2 font-weight-black text-grey">
            <strong id="note-detail-page-strong-label">
              {{ t("pages-contents.note-detail-page.updated-at") }}
            </strong>
            {{ $dayjs(data?.updated_at).format("YYYY/MM/DD HH:mm") }}
          </p>
        </div>
      </v-sheet>
    </section>

    <v-sheet
      :elevation="4"
      class="py-4 px-4 py-md-10 px-md-8 flex-1-1"
      style="background-color: transparent; backdrop-filter: blur(20px)"
    >
      <!-- update button -->
      <v-fab
        @click="handleUpdate"
        size="large"
        class="position-sticky"
        :loading="isUpdating"
        :disabled="isUpdating"
        :absolute="true"
        :style="{ top: '90%', zIndex: 2 }"
      >
        {{ t("buttons.edit") }}
      </v-fab>

      <!-- editor -->
      <custom-tiptap-editor
        :text="data?.message"
        :editable="true"
        @tiptap-editor-update="editorData.content = $event"
      />
    </v-sheet>
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
#note-detail-page-strong-label {
  display: inline-block;
  text-align: center;
  width: 80px;
}
</style>
