<template>
  <div class="container mx-auto max-w-4xl my-8">
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'border border-gray-400 p-4 mx-auto focus:outline-none min-h-[12rem]',
    },
  },
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit],
})
</script>
