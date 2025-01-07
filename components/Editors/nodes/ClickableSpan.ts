import { Node } from '@tiptap/core';

export const ClickableSpan = Node.create({
  name: 'clickableSpan',
  group: 'inline',
  content: 'text*',
  inline: true,
  addAttributes() {
    return {
      suggestion: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-suggestion'),
        renderHTML: (attributes) => {
          if (!attributes.suggestion) {
            return {};
          }
          return { 'data-suggestion': attributes.suggestion };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span.clickable-span',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        class: 'clickable-span',
        'data-suggestion': HTMLAttributes.suggestion || '',
      },
      0,
    ];
  },
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const dom = document.createElement('span');
      dom.classList.add('clickable-span');
      dom.setAttribute('data-suggestion', node.attrs.suggestion || '');
      dom.innerHTML = node.textContent;

      // 添加点击事件
      dom.addEventListener('click', () => {
        const suggestion = dom.getAttribute('data-suggestion');
        alert(`Suggestion: ${suggestion}`);
      });

      return {
        dom,
      };
    };
  },
});