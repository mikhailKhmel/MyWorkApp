import Dialog from '../dialog/Dialog';
import DialogTitle from '../dialog/DialogTitle';
import DialogContent from '../dialog/DialogContent';
import DialogActions from '../dialog/DialogActions';
import Button from '../Button';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFolders} from '../../slicers/FoldersSlice';
import createFolder from '../../utils/CreateFolder';
import {setCurrentEditableNote} from '../../slicers/NotesSlice';
import Input from '../Input';
import {FolderAddIcon} from '../../svgs/folder-add-icon';
import {NoteAddIcon} from '../../svgs/note-add-icon';
import {useNavigate} from 'react-router-dom';

function Footer() {
  const [open, setOpen] = useState(false);
  const [folderTitle, setFolderTitle] = useState('');
  const folders = useSelector((state) => state.folders.folders);
  const {parent} = useSelector((state) => state.folders.filter);
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (open === false) {
      setFolderTitle('');
    }
  }, [open]);

  function handleCreateFolder() {
    setOpen(false);
    dispatch(setFolders(
        [...folders, createFolder(folderTitle, parent, profile.id)]));
  }

  function handleOpenEditor() {
    dispatch(setCurrentEditableNote(null));
    navigate('/editor');
  }

  return (
      <>
        <div
            className="fixed bottom-0 w-full drop-shadow flex flex-row justify-between items-stretch py-2 px-5 bg-white rounded-t-md dark:bg-neutral-600">
          <button
              className={`${parent === -1 ?
                  'invisible' :
                  ''} transition-all ease-in-out active:scale-125 sm:hover:scale-125`}
              onClick={() => setOpen(true)}>
            <FolderAddIcon/>
          </button>
          <button
              className="transition-all ease-in-out active:scale-125 sm:hover:scale-125"
              onClick={handleOpenEditor}>
            <NoteAddIcon/>
          </button>
        </div>

        <Dialog open={open}>
          <DialogTitle>
            Создание папки
          </DialogTitle>
          <DialogContent>
            <Input value={folderTitle}
                   onChange={(event) => setFolderTitle(event.target.value)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={handleCreateFolder}
                    disabled={!folderTitle}>Создать</Button>
          </DialogActions>
        </Dialog>
      </>
  );
}

export default Footer;