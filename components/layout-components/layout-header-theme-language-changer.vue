<script setup lang="ts">
import useTranslation from "~/composables/core/use-translation";

// ------------------------------------------------------------------------------------------

const { currentLang, selectableLangs, changeLang } = useTranslation();

function getFlagImageSrc(langCode: string): string {
  try {
    return `/upload/flags/${getCountryFromLangCode(langCode)}-32*32.svg`;
  } catch {
    return ``;
  }
}

const ELEMENT_ID = "__layout-header-theme-language-changer" as const;
</script>

<template>
  <v-btn
    :id="ELEMENT_ID"
    :width="48"
    :height="48"
    style="min-width: 0"
    class="d-flex align-center justify-center rounded-lg"
  >
    <v-img
      cover
      :width="32"
      :height="32"
      :src="getFlagImageSrc(currentLang)"
      :lazy-src="getFlagImageSrc(currentLang)"
      aspect-ratio="16/9"
      draggable="false"
      class="rounded-circle cursor-pointer border-thin"
    />
  </v-btn>

  <v-menu :activator="`#${ELEMENT_ID}`" location="bottom center" transition="slide-y-transition">
    <v-list
      class="mt-3 py-1 px-1 rounded-lg"
      style="background-color: transparent; backdrop-filter: blur(20px)"
    >
      <v-list-item
        v-for="lang in selectableLangs"
        :key="lang.code"
        :value="lang.code"
        rounded
        density="comfortable"
        @click="changeLang(lang.code)"
        class="py-0 px-2 mb-1 rounded-lg"
      >
        <v-img
          cover
          :width="32"
          :height="32"
          :src="getFlagImageSrc(lang.code)"
          :lazy-src="getFlagImageSrc(lang.code)"
          aspect-ratio="16/9"
          draggable="false"
          class="rounded-circle cursor-pointer border-thin"
        />

        <v-tooltip activator="parent" location="start" :text="lang.name" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
