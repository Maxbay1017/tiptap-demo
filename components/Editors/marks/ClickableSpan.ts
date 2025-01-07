import { Mark } from '@tiptap/core';

export const ClickableSpan = Mark.create({
  name: 'clickableSpan',
  group: 'inline',
  parseHTML() {
    return [
      {
        tag: 'span.clickable-span',
      },
    ];
  },
  addAttributes() {
    return {
      suggestion: {
        default: '',
        parseHTML: element => element.getAttribute('data-suggestion') || '',
        renderHTML: attributes => {
          return { 'data-suggestion': attributes.suggestion || '' };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', 
      { 
        ...HTMLAttributes, 
        class: 'clickable-span',
        onclick: `alert('Suggestion: ' + this.getAttribute('data-suggestion'))`
      }, 
      0
    ];
  },
//   addCommands() {
//     return {
//       setClickableSpan: () => ({ commands }) => {
//         return commands.setNode(this.name);
//       },
//         return commands.toggleNode(this.name);
//       },
//       unsetClickableSpan: () => ({ commands }) => {
//         return commands.unsetNode(this.name);
//       },
//     };
//   },
});