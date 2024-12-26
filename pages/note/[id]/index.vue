<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import useGetNoteData from "~/composables/use-api/use-get-note-data";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const { params } = useRoute();
const noteId = computed<string>(() => params.id as string);

// ------------------------------------------------------------------------------------------

const { data, isEmpty } = useGetNoteData({ noteId: noteId.value });
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-detail')">
    <section v-if="!isEmpty">
      <v-sheet
        :elevation="4"
        class="py-10 px-8"
        style="background-color: transparent; backdrop-filter: blur(20px)"
      >
        <h3 class="text-h5 font-weight-black">{{ data?.title }}</h3>
        <h3 class="text-subtitle-2 font-weight-black text-grey">{{ data?.created_at }}</h3>
        <h3 class="text-subtitle-2 font-weight-black text-grey">{{ data?.updated_at }}</h3>
        <p class="text-subtitle-1 my-6">{{ data?.message }}</p>
      </v-sheet>
    </section>
  </layout-page-content-wrapper>
</template>
