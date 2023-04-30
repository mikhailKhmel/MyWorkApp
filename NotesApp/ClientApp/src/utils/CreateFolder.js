import {v4} from 'uuid';
import moment from 'moment';

function createFolder(title, parent, userId) {
  return {
    id: v4(),
    title,
    userId,
    parent,
    lastUpdate: moment().format(),
    isDelete: false,
  };
}

export default createFolder;