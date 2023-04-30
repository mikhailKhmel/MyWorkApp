import {useDispatch, useSelector} from 'react-redux';
import {setFilter, updatePath} from '../../slicers/FoldersSlice.js';
import Item from './Item.js';
import {useEffect, useState} from 'react';
import {setCurrentEditableNote} from '../../slicers/NotesSlice.js';
import {sleep} from '../../utils/sleep';
import {GetTitleText} from '../../utils/GetTitleText';
import {ArrowLeftIcon} from '../../svgs/arrow-left-icon';
import {useNavigate} from 'react-router-dom';

function ItemsList() {
  const folders = useSelector((state) => state.folders.folders);
  const notes = useSelector((state) => state.notes.notes);
  const {parent} = useSelector(state => state.folders.filter);
  const path = useSelector(state => state.folders.path);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localFolders, setLocalFolders] = useState([]);
  const [localNotes, setLocalNotes] = useState([]);

  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const tempFolders = [...folders.filter(x => !x.isDelete)];
    if (parent) {
      setLocalFolders(
          tempFolders.filter(x => x.parent === parent));
    } else {
      setLocalFolders(tempFolders?.filter(x => x.parent === null));
    }

    const tempNotes = [...notes.filter(x => !x.isDelete)];
    if (parent) {
      if (parent === -1) {
        setLocalNotes([...tempNotes]);
      } else {
        setLocalNotes(tempNotes.filter(x => x.parent === parent));
      }
    } else {
      setLocalNotes(null);
    }
  }, [parent, notes, folders]);

  function handleClickFolder(parentId) {
    const newPath = [...path, parent];
    dispatch(updatePath(newPath));
    dispatch(setFilter(parentId));

    setSlide(true);
    sleep(0).then(() => setSlide(false));
  }

  function handleBackFolder() {
    const tempPath = [...path];
    const last = tempPath.pop();
    dispatch(updatePath(tempPath));
    dispatch(setFilter(last));

    setSlide(true);
    sleep(0).then(() => setSlide(false));
  }

  function handleOpenNote(id) {
    dispatch(setCurrentEditableNote(id));
    navigate('/editor');
  }

  return (
      <>
        <div className={slide ? 'hidden' : 'block'}>
          <div
              className="flex flex-col gap-3 p-2 bg-white mt-12 text-xl animate-slide dark:bg-neutral-800 rounded-lg">
            {parent && <div onClick={handleBackFolder}
                            className="p-2 flex flex-row items-center cursor-pointer rounded-md sm:hover:bg-slate-100 hover:dark:bg-neutral-500">
              <ArrowLeftIcon/> Назад
            </div>}
            {!parent && <Item type="folder" text="Все заметки"
                              action={() => handleClickFolder(-1)}/>}
            {localFolders && localFolders.map(value => {
              return (
                  <Item key={value.id} type="folder"
                        text={value.title || value.content}
                        action={() => handleClickFolder(value.id)}/>
              );
            })}
            {localNotes && localNotes.map(value => {
              let text = '';
              if (value.title) {
                text = value.title;
              } else if (value.content) {
                const blocks = value.content.blocks;
                if (blocks.length === 0) {
                  text = 'Пустая заметка';
                } else {
                  text = GetTitleText(value.content.blocks[0]);
                }
              }
              return (
                  <Item key={value.id} type="note"
                        text={text}
                        action={async () => await handleOpenNote(value.id)}/>
              );
            })}
          </div>
        </div>

      </>

  );
}

export default ItemsList;