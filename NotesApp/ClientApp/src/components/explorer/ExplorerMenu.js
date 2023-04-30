import DropdownItem from '../dropdown/DropdownItem';
import Dropdown from '../dropdown/Dropdown';
import {setFilter, setFolders, updatePath} from '../../slicers/FoldersSlice';
import {useEffect, useState} from 'react';
import Dialog from '../dialog/Dialog';
import DialogTitle from '../dialog/DialogTitle';
import DialogContent from '../dialog/DialogContent';
import DialogActions from '../dialog/DialogActions';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {findFoldersWithoutParent} from '../../utils/FindFoldersWithoutParent';
import {setNotes} from '../../slicers/NotesSlice';
import Item from './Item';
import Input from '../Input';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

function ExplorerMenu(props) {
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [folderTitle, setFolderTitle] = useState(undefined);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {parent} = useSelector(state =>
      state.folders.filter,
  );
  const folders = useSelector(state =>
      state.folders.folders,
  );
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    if (!openMoveDialog) {
      setSelectedFolder(null);
    }
  }, [openMoveDialog]);

  function handleRenameFolder() {
    const tempFolder = [...folders];
    const currentFolder = {...tempFolder.find(x => x.id === parent)};
    currentFolder.title = folderTitle;
    currentFolder.lastUpdate = moment().format();
    const index = tempFolder.findIndex(x => x.id === currentFolder.id);
    tempFolder[index] = currentFolder;
    dispatch(setFolders(tempFolder));
    setOpenRenameDialog(false);
  }

  function handleRenameFolderTitle() {
    props.onClose();
    setOpenRenameDialog(true);
    setFolderTitle(folders.find(x => x.id === parent).title);
  }

  function handleRemoveFolderRecursive() {
    setOpenRemoveDialog(false);
    let tempFolders = [...folders].map(x => {
      return {...x};
    });
    let tempNotes = [...notes].map(x => {
      return {...x};
    });

    const foldersForRemove = [
      ...findFoldersWithoutParent(tempFolders.filter(x => x.id !== parent)),
      ...tempFolders.filter(x => x.id === parent)];
    for (const folder of tempFolders) {
      if (foldersForRemove.map(x => x.id).includes(folder.id)) {
        folder.isDelete = true;
        folder.lastUpdate = moment().format();
      }
    }

    const notesForRemove = tempNotes.filter(x => x.parent === parent ||
        foldersForRemove.map(y => y.id).includes(x.parent));
    for (const note of tempNotes) {
      if (notesForRemove.map(x => x.id).includes(note.id)) {
        note.isDelete = true;
        note.lastUpdate = moment().format();
      }
    }

    dispatch(setFolders([...tempFolders]));
    dispatch(setNotes([...tempNotes]));

    dispatch(setFilter(null));

    dispatch(updatePath([null]));
  }

  function handleMoveFolder() {
    const folder = {...folders.find(x => x.id === parent)};
    folder.parent = selectedFolder;
    folder.lastUpdate = moment().format();
    dispatch(
        setFolders([...folders.filter(x => x.id !== folder.id), folder]));
    setOpenMoveDialog(false);
  }

  return (
      <>
        <Dropdown open={props.open}>
          <DropdownItem onClick={() => navigate('/settings')}>
            Настройки
          </DropdownItem>
          {parent && parent !== -1 &&
              <DropdownItem onClick={handleRenameFolderTitle}>
                Переименовать
              </DropdownItem>}
          {parent && parent !== -1 &&
              <DropdownItem onClick={() => {
                props.onClose();
                setOpenMoveDialog(true);
              }}>
                Переместить
              </DropdownItem>
          }
          {parent && parent !== -1 &&
              <DropdownItem onClick={() => setOpenRemoveDialog(true)}>
                Удалить
              </DropdownItem>
          }
        </Dropdown>

        <Dialog open={openMoveDialog}>
          <DialogTitle>
            Переместить...
          </DialogTitle>
          <DialogContent>
            <div className=" h-80 overflow-auto">
              <div key={'null'} className={selectedFolder === null
                  ? 'bg-slate-300 rounded-lg'
                  : ''}>
                <Item type="folder" text="Все папки"
                      action={() => setSelectedFolder(null)}/>
              </div>
              {folders && folders.filter(x => x.id !== parent).map(folder => {
                return (
                    <div key={folder.id}
                         className={selectedFolder === folder.id
                             ? 'bg-slate-300 rounded-lg'
                             : ''}>
                      <Item type="folder" text={folder.title}
                            action={() => setSelectedFolder(folder.id)}/>
                    </div>
                );
              })}
            </div>

          </DialogContent>
          <DialogActions>
            <Button
                onClick={() => setOpenMoveDialog(false)}>Отмена</Button>
            <Button onClick={handleMoveFolder}
                    className={`px-5`}>Подтвердить</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openRenameDialog}>
          <DialogTitle>
            Переименование
          </DialogTitle>
          <DialogContent>
            <Input value={folderTitle || ''}
                   onChange={(event) => setFolderTitle(event.target.value)}/>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRenameDialog(false)}>Отмена</Button>
            <Button onClick={handleRenameFolder}
                    disabled={!folderTitle}>Подтвердить</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openRemoveDialog}>
          <DialogTitle>
            Удаление
          </DialogTitle>
          <DialogContent>
            <div>Вы уверены?</div>
            <div className="font-semibold">(удалится всё содержимое папки)</div>
          </DialogContent>
          <DialogActions>
            <Button
                onClick={() => setOpenRemoveDialog(false)}>Отмена</Button>
            <Button onClick={handleRemoveFolderRecursive}
                    color="bg-red-400 hover:bg-red-600">Подтвердить</Button>
          </DialogActions>
        </Dialog>
      </>

  );
}

export default ExplorerMenu;