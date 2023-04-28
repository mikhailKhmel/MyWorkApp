import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Nestedlist from '@editorjs/nested-list';
import Table from '@editorjs/table';
import Marker from '@editorjs/marker';
import Checklist from '@editorjs/checklist';
import Code from '@editorjs/code';

export const EditorTools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Введите заголовок',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  list: {
    class: Nestedlist,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  table: Table,
  marker: Marker,
  checklist: Checklist,
  code: Code,
};