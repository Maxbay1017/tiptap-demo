import { Node } from '@tiptap/core';

export const CustomParagraph = Node.create({
  // 节点名称，必须与默认的paragraph节点名称一致
  name: 'paragraph',
  
  // 节点分组，必须与默认的paragraph节点组一致
  group: 'block',
  
  // 节点内容模型，block*表示可以包含其他块级节点
  content: 'block*',
  
  // 定义如何从HTML解析该节点
  parseHTML() {
    return [
      // 匹配普通的span标签
      { tag: 'span' },
      // 匹配带有custom-paragraph类的span标签
      { tag: 'span.custom-paragraph' },
    ];
  },

  // 定义如何将该节点渲染为HTML
  renderHTML({ HTMLAttributes }) {
    return [
      // 使用span标签
      'span', 
      // 合并传入的HTML属性和自定义类名
      { ...HTMLAttributes, class: 'custom-paragraph' }, 
      // 内容位置
      0
    ];
  },

  // 定义节点的额外属性
  addAttributes() {
    return {
      class: {
        // 默认添加custom-paragraph类
        default: 'custom-paragraph',
      },
    };
  },

  // 自定义节点视图
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      // 创建span元素
      const dom = document.createElement('span');
      // 添加自定义类名
      dom.classList.add('custom-paragraph');
      // 保留原始HTML内容
      dom.innerHTML = node.textContent || '';

      // 添加点击事件
      dom.addEventListener('click', () => {
        console.log('Paragraph clicked!', node);
        alert(`You clicked a paragraph: ${node.textContent}`);
      });

      // 返回DOM元素
      return {
        dom,
      };
    };
  },
});