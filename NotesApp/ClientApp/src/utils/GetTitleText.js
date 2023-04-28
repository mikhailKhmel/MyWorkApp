export function GetTitleText(block) {
  const type = block.type;
  switch (type) {
    case 'paragraph': {
      return block.data.text;
    }
    case 'list': {
      return block.data.items[0].content;
    }
    case 'header': {
      return block.data.text;
    }
    case 'table': {
      return block.data.content;
    }
    case 'checklist': {
      return block.data.items[0].text;
    }
    case 'code': {
      return block.data.code;
    }
    default: {
      return block.id || 'Неизвестный тип заметки';
    }
  }
}