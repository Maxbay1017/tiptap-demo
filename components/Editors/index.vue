<template>
    <div class="container mx-auto max-w-4xl my-8">
        <Card ref="cardRef">
            <p>你点击了一段文字！</p>
        </Card>
        <div v-if="editor" class="flex gap-2 mb-2">
            <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'bg-gray-200': editor.isActive('bold') }" class="p-2 rounded hover:bg-gray-100">
                <span class="font-bold">B</span>
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'bg-gray-200': editor.isActive('italic') }" class="p-2 rounded hover:bg-gray-100">
                <span class="italic">I</span>
            </button>
            <button @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'bg-gray-200': editor.isActive('underline') }" class="p-2 rounded hover:bg-gray-100">
                <span class="underline">U</span>
            </button>
            <button @click="editor.chain().focus().toggleHighlight().run()"
                :class="{ 'bg-gray-200': editor.isActive('highlight') }" class="p-2 rounded hover:bg-gray-100">
                <span class="bg-yellow-200 px-1">高亮</span>
            </button>
        </div>
        <EditorContent :editor="editor" />
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'

// 定义组件props，接收父组件传递的modelValue字符串
const props = defineProps({
    modelValue: String,
})

// 定义组件emit事件，用于更新父组件的modelValue
// 1. 定义了一个名为 update:modelValue 的事件
const emit = defineEmits(['update:modelValue'])


const cardRef = ref()

const editor = useEditor({
    content: props.modelValue,
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
    extensions: [
        StarterKit,
        Highlight.configure({ multicolor: true }),
        Underline,
    ],
    editorProps: {
        attributes: {
            class: 'border border-gray-400 p-4 mx-auto focus:outline-none min-h-[12rem]',
        },
        handleClick: (view, pos, event) => {
            const node = view.state.doc.nodeAt(pos)
            if (node?.type.name === 'paragraph') {
                const text = node.textContent
                if (text.includes('小情歌')) {
                    cardRef.value?.show()
                }
            }
        }
    },
})

</script>