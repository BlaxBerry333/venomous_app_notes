<script setup lang="ts">
import { unref } from "vue";
import customTiptapEditorBar from "./custom-tiptap-editor-bar.vue";

const props = defineProps({
  text: String,
});

const editor = useEditor({
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
  ],
});

onMounted(() => {
  if (!!unref(editor)) {
    unref(editor)?.commands.setContent(props.text ?? "<p>.... 🎉</p>");
  }
});

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>

<template>
  <custom-tiptap-editor-bar :editor="editor" />

  <TiptapEditorContent :editor="editor" />
</template>

<style lang="scss">
.tiptap {
  outline: none !important;
  font-size: larger !important;
  padding: 24px 0 !important;

  code {
    background-color: rgba(#9e9e9e, 0.2) !important;
    color: rgb(var(--v-theme-secondary)) !important;
    outline: 2px solid rgba(#9e9e9e, 0.6) !important;
    padding: 4px !important;
    margin: 0 4px !important;
    border-radius: 8px !important;
    font-weight: 400 !important;
  }

  blockquote {
    background-color: rgba(#c5c5c5, 0.2) !important;
    color: rgba(#000000, 0.6) !important;
    padding: 8px 0 8px 16px !important;
    margin: 0 4px !important;
  }
}
</style>
