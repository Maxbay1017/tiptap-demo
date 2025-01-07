import { Node } from '@tiptap/core';

export const HighlightNode = Node.create({
  name: 'highlightNode',
  group: 'inline',
  content: 'text*',
  inline: true,
  addAttributes() {
    return {
      suggestion: {
        default: '', // 存储修改意见
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span.highlight',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['span', { ...HTMLAttributes, class: 'highlight' }, 0];
  },
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const dom = document.createElement('span');
      dom.classList.add('highlight');
      dom.innerHTML = node.textContent;

      // 添加点击事件
      dom.addEventListener('click', () => {
        const suggestion = node.attrs.suggestion;
        alert(`修改意见：${suggestion}`);
      });

      return {
        dom,
      };
    };
  },
});