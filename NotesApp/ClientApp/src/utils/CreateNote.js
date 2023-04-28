import {v4} from 'uuid';

function createNote(title, content, parent, userId) {
  return {
    _id: v4(),
    title,
    content,
    userId,
    lastUpdate: Date.now(),
    parent,
    isDelete: false,
  };
}

export default createNote;