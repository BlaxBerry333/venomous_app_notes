<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";
import useGetNoteList from "~/composables/use-api/use-get-note-list";
import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { data, isLoading, isEmpty } = useGetNoteList({ selectedNoteType: undefined });
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.note-list')">
    <section v-if="!isEmpty">
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
              <v-card-subtitle class="font-weight-black text-grey-lighten-2">
                {{ $dayjs(note.created_at).format("YYYY/MM/DD HH:mm") }}
              </v-card-subtitle>
              <v-card-title class="text-white font-weight-black">{{ note.message }}</v-card-title>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
