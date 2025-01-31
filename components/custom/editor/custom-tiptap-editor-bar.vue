<script setup lang="ts">
import clsx from "clsx";
import useTranslation from "~/composables/core/use-translation";

defineProps({
  editor: Object,
});

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();
</script>

<template>
  <div
    v-if="editor"
    id="custom-tiptap-editor-bar"
    class="d-flex d-md-block flex-wrap position-sticky"
    :style="{ top: '68px', zIndex: 2 }"
  >
    <!-- Font Styles -->
    <v-sheet class="d-inline-block">
      <v-btn
        color="primary"
        :style="{
          width: '140px',
          margin: '3px',
          border: '2px solid rgb(var(--v-theme-primary))',
        }"
      >
        <span class="text-subtitle-2">{{ t("components.editor.font-styles") }}</span>
        <v-menu activator="parent">
          <v-list dense class="d-flex flex-column px-2">
            <v-btn
              @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('bold'),
                  'is-disabled': !editor.can().chain().focus().toggleBold().run(),
                })
              "
            >
              {{ t("components.editor.bold") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('italic'),
                  'is-disabled': !editor.can().chain().focus().toggleItalic().run(),
                })
              "
            >
              {{ t("components.editor.italic") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('strike'),
                  'is-disabled': !editor.can().chain().focus().toggleStrike().run(),
                })
              "
            >
              {{ t("components.editor.strike") }}
            </v-btn>
          </v-list>
        </v-menu>
      </v-btn>
    </v-sheet>

    <!-- Font Sizes -->
    <v-sheet class="d-inline-block">
      <v-btn
        color="primary"
        :style="{
          width: '140px',
          margin: '3px',
          border: '2px solid rgb(var(--v-theme-primary))',
        }"
      >
        <span class="text-subtitle-2">{{ t("components.editor.font-sizes") }}</span>
        <v-menu activator="parent">
          <v-list dense class="d-flex flex-column px-2">
            <v-btn
              @click="editor.chain().focus().setParagraph().run()"
              :disabled="!editor.can().chain().focus().setParagraph().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('paragraph'),
                  'is-disabled': !editor.can().chain().focus().setParagraph().run(),
                })
              "
            >
              {{ t("components.editor.paragraph") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 1 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { slevel: 1 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
                })
              "
            >
              {{ t("components.editor.h1") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 2 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { level: 2 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
                })
              "
            >
              {{ t("components.editor.h2") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 3 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { level: 3 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
                })
              "
            >
              {{ t("components.editor.h3") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 4 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { level: 4 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 4 }).run(),
                })
              "
            >
              {{ t("components.editor.h4") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 5 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { level: 5 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 5 }).run(),
                })
              "
            >
              {{ t("components.editor.h5") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
              :disabled="!editor.can().chain().focus().toggleHeading({ level: 6 }).run()"
              :class="
                clsx({
                  'is-active': editor.isActive('heading', { level: 6 }),
                  'is-disabled': !editor.can().chain().focus().toggleHeading({ level: 6 }).run(),
                })
              "
            >
              {{ t("components.editor.h6") }}
            </v-btn>
          </v-list>
        </v-menu>
      </v-btn>
    </v-sheet>

    <!-- List Types -->
    <v-sheet class="d-inline-block">
      <v-btn
        color="primary"
        :style="{
          width: '140px',
          margin: '3px',
          border: '2px solid rgb(var(--v-theme-primary))',
        }"
      >
        <span class="text-subtitle-2">{{ t("components.editor.list-types") }}</span>
        <v-menu activator="parent">
          <v-list dense class="d-flex flex-column px-2">
            <v-btn
              @click="editor.chain().focus().toggleBulletList().run()"
              :disabled="!editor.can().chain().focus().toggleBulletList().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('bulletList'),
                  'is-disabled': !editor.can().chain().focus().toggleBulletList().run(),
                })
              "
            >
              {{ t("components.editor.bullet-list") }}
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleOrderedList().run()"
              :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('orderedList'),
                  'is-disabled': !editor.can().chain().focus().toggleOrderedList().run(),
                })
              "
            >
              {{ t("components.editor.ordered-list") }}
            </v-btn>
          </v-list>
        </v-menu>
      </v-btn>
    </v-sheet>

    <!-- Others -->
    <v-sheet class="d-inline-block">
      <v-btn
        color="primary"
        :style="{
          width: '140px',
          margin: '3px',
          border: '2px solid rgb(var(--v-theme-primary))',
        }"
      >
        <span class="text-subtitle-2">{{ t("components.editor.others") }}</span>
        <v-menu activator="parent">
          <v-list dense class="d-flex flex-column px-2">
            <v-btn
              @click="editor.chain().focus().toggleCode().run()"
              :disabled="!editor.can().chain().focus().toggleCode().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('code'),
                  'is-disabled': !editor.can().chain().focus().toggleCode().run(),
                })
              "
            >
              {{ t("components.editor.code") }}
            </v-btn>
            <!-- <v-btn
              @click="editor.chain().focus().toggleCodeBlock().run()"
              :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
              :class="clsx({ 'is-active': editor.isActive('codeBlock') })"
            >
              {{ t("components.editor.code-block") }}
            </v-btn> -->
            <v-btn
              @click="editor.chain().focus().toggleBlockquote().run()"
              :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
              :class="
                clsx({
                  'is-active': editor.isActive('blockquote'),
                  'is-disabled': !editor.can().chain().focus().toggleBlockquote().run(),
                })
              "
            >
              {{ t("components.editor.blockquote") }}
            </v-btn>
          </v-list>
        </v-menu>
      </v-btn>
    </v-sheet>

    <!-- <v-btn @click="editor.chain().focus().unsetAllMarks().run()">clear marks</v-btn> -->
    <!-- <v-btn @click="editor.chain().focus().clearNodes().run()">clear nodes</v-btn> -->
    <!-- <v-btn @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</v-btn> -->
    <!-- <v-btn @click="editor.chain().focus().setHardBreak().run()">hard break</v-btn> -->

    <v-sheet class="d-inline-block">
      <v-btn
        variant="elevated"
        icon="mdi-undo"
        density="comfortable"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        :class="
          clsx({
            'is-active': editor.can().chain().focus().undo().run(),
            'is-disabled': !editor.can().chain().focus().undo().run(),
          })
        "
        :style="{ margin: '3px' }"
      />
    </v-sheet>
    <v-sheet class="d-inline-block">
      <v-btn
        variant="elevated"
        icon="mdi-redo"
        density="comfortable"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        :class="
          clsx({
            'is-active': editor.can().chain().focus().redo().run(),
            'is-disabled': !editor.can().chain().focus().redo().run(),
          })
        "
        :style="{ margin: '3px' }"
      />
    </v-sheet>
  </div>
</template>

<style scoped lang="scss">
.is-active {
  outline: 2px solid rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-secondary)) !important;
  font-weight: bold !important;
}

.is-disabled {
  background-color: rgba(var(--v-theme-surface), 0.5) !important;
  color: rgba(var(--v-theme-on-surface), 0.5) !important;
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

button {
  background-color: rgba(var(--v-theme-surface), 0.5) !important;
  color: rgba(var(--v-theme-on-surface)) !important;
}

.v-menu {
  margin-top: 2px;
  .v-btn {
    margin-bottom: 2px;
  }
}
</style>
