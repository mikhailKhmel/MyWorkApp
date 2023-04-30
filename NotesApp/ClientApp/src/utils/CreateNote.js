import {v4} from 'uuid';
import moment from 'moment';

function createNote(title, content, parent, userId) {
  return {
    id: v4(),
    title,
    content,
    userId,
    lastUpdate: moment().format(),
    parent,
    isDelete: false,
  };
}

export default createNote;