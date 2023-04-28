import {v4} from 'uuid';

function createFolder(title, parent, userId) {
  return {
    _id: v4(),
    title,
    userId,
    parent,
    lastUpdate: Date.now(),
    isDelete: false,
  };
}

export default createFolder;