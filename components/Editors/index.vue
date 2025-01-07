<template>
  <div class="container mx-auto max-w-4xl my-8">
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { ClickableSpan } from './marks/ClickableSpan'; // 确保路径正确
import { HighlightNode } from './nodes/HighLights'; // 确保路径正确vue'
import { highlights } from './data/highlights';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
        // 动态应用高亮逻辑
        applyHighlights(editor);
  },
  extensions: [
    StarterKit,
    HighlightNode,
    ClickableSpan,
  ],
  editorProps: {
    attributes: {
      class: 'border border-gray-400 p-4 mx-auto focus:outline-none min-h-[12rem]',
      contenteditable: 'true', // 确保编辑器可编辑
    },
  },
});

const applyHighlights = (editor) => {
  const { state } = editor;
  const { doc } = state;
  const textNodes = []; // 存储所有匹配的文本内容

  // 遍历 highlights 数组 找到文本中所有要高亮的textNode
  highlights.forEach(({ text, suggestion }) => {

    // 查找所有匹配的文本节点
    doc.descendants((node, pos) => {
      if (node.isText && node.text.includes(text)) {
        // 找到匹配的文本在节点中的起始位置
        const start = node.text.indexOf(text);
        const from = pos + start; // 匹配文本的起始位置
        const to = from + text.length; // 匹配文本的结束位置

        textNodes.push({ from, to, suggestion,text });
        console.log('text:', text);
        console.log('suggestion:', suggestion);
        console.log(from,to);
        
      }
    });
  });

  console.log('textNodes:', textNodes.length);
  
    // 遍历 textNodes，对其使用自定义的 span 进行包裹
    textNodes.reverse().forEach(({ from, to, suggestion }) => {
    // 使用 ClickableSpan 包裹匹配的文本
    editor.chain()
      .setTextSelection({ from, to }) // 选中匹配的文本
      .setMark('clickableSpan',{suggestion}) // 使用自定义的 ClickableSpan 标记
      .run();
  });
}; 

</script>

<style>
.clickable-span {
  cursor: pointer; /* 添加鼠标指针样式 */
  background-color: #FDE9A4; /* 添加背景色 */
  padding: 2px 4px; /* 添加内边距 */
  border-radius: 4px; /* 添加圆角 */
}
.highlight {
  background-color: #FDE9A4; /* 高亮背景色 */
  cursor: pointer; /* 鼠标指针样式 */
  padding: 2px 4px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
}
</style>