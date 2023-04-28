import Dropdown from '../dropdown/Dropdown';
import DropdownItem from '../dropdown/DropdownItem';
import Dialog from '../dialog/Dialog';
import DialogTitle from '../dialog/DialogTitle';
import DialogContent from '../dialog/DialogContent';
import DialogActions from '../dialog/DialogActions';
import Button from '../Button';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setNotes} from '../../slicers/NotesSlice';
import Item from '../explorer/Item';
import {useNavigate} from 'react-router-dom';

function EditorMenu(props) {
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const folders = useSelector((state) => state.folders.folders);
  const notes = useSelector((state) => state.notes.notes);
  const currentEditableNote = useSelector(
      state => state.notes.currentEditableNote);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRemoveNote() {
    const tempNotes = [...notes].map(x => {
      return {...x};
    });
    const note = {...tempNotes.find(x => x._id === currentEditableNote)};
    note.isDelete = true;
    note.lastUpdate = Date.now();
    tempNotes[tempNotes.findIndex(x => x._id === note._id)] = {...note};
    dispatch(setNotes([...tempNotes]));
    navigate('/');
  }

  function handleMoveNote() {
    const note = {...notes.find(x => x._id === currentEditableNote)};
    note.parent = selectedFolder;
    note.lastUpdate = Date.now();
    dispatch(
        setNotes([...notes.filter(x => x._id !== currentEditableNote), note]));
    setOpenMoveDialog(false);
    props.onClose();
  }

  return (<>
    <Dropdown open={props.open}>
      <DropdownItem onClick={() => {
        props.onClose();
        setOpenMoveDialog(true);
      }}>
        Переместить
      </DropdownItem>
      <DropdownItem onClick={() => {
        props.onClose();
        setOpenRemoveDialog(true);
      }}>
        Удалить
      </DropdownItem>
    </Dropdown>

    <Dialog open={openMoveDialog}>
      <DialogTitle>
        Переместить...
      </DialogTitle>
      <DialogContent>
        <div className=" h-80 overflow-auto">
          {folders && folders.filter(x => x._id !==
              notes.find(x => x._id === currentEditableNote).parent).
              map(folder => {
                return (
                    <div key={folder._id}
                         className={selectedFolder === folder._id
                             ? 'bg-slate-300 rounded'
                             : ''}>
                      <Item type="folder" text={folder.title}
                            action={() => setSelectedFolder(folder._id)}/>
                    </div>
                );
              })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
            onClick={() => setOpenMoveDialog(false)}>Отмена</Button>
        <Button onClick={handleMoveNote}
                className={`px-5`}>Подтвердить</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={openRemoveDialog}>
      <DialogTitle>
        Удаление
      </DialogTitle>
      <DialogContent>
        <p>Вы уверены?</p>
      </DialogContent>
      <DialogActions>
        <Button
            onClick={() => setOpenRemoveDialog(false)}>Отмена</Button>
        <Button onClick={handleRemoveNote}
                color={`bg-red-400 hover:bg-red-600`}>Да</Button>
      </DialogActions>
    </Dialog>
  </>);
}

export default EditorMenu;