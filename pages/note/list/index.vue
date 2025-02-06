<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import useGetNoteList from "~/composables/use-api/use-get-note-list";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { data, isLoading, isEmpty, isError, error } = useGetNoteList({
  selectedNoteType: undefined,
});

function formatHTMLSting(htmlString: string): string {
  return htmlString.match(/>([^<]+)<\/\w+/)?.[1] || "";
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-list')">
    <section v-if="isError" class="flex-1-1">
      <v-empty-state icon="mdi-semantic-web" :title="error" :size="200" />
    </section>

    <section v-else-if="isEmpty" class="flex-1-1">
      <v-empty-state icon="mdi-semantic-web" :title="t('messages.status-empty')" :size="200" />
    </section>

    <section v-if="!isError && !isEmpty">
      <v-lazy :min-height="160 * 2" :options="{ threshold: 0.5 }" transition="fade-transition">
        <v-row>
          <v-col v-for="note in data" :key="note._id" cols="12" sm="6" lg="4">
            <v-card
              :loading="isLoading"
              :height="160"
              hover
              image="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              class="py-4"
              style="background-color: transparent; backdrop-filter: blur(10px)"
              @click="navigateTo(`/note/${note._id}`)"
            >
              <div class="card-mask" />
              <div class="card-title">
                <!-- updated_at -->
                <v-card-subtitle class="font-weight-black text-grey-lighten-2">
                  {{ $dayjs(note.updated_at).format("YYYY/MM/DD HH:mm") }}
                </v-card-subtitle>
                <!-- message -->
                <v-card-title class="text-white font-weight-black">
                  {{ formatHTMLSting(note.message) }}
                </v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-lazy>
    </section>
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
.card-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.card-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding-top: 16px;
}
</style>
