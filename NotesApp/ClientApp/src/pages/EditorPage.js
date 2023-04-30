import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import createNote from '../utils/CreateNote.js';
import {setNotes} from '../slicers/NotesSlice.js';
import EditorHeader from '../components/editor/EditorHeader';
import {useNavigate} from 'react-router-dom';
import Editor from '../components/editor/Editor';
import moment from 'moment';

function EditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();

  const {parent} = useSelector(state => state.folders.filter);
  const notes = useSelector(state => state.notes.notes);
  const profile = useSelector(state => state.profile.profile);
  const currentEditableNote = useSelector(
      state => state.notes.currentEditableNote);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  async function handleBackAndSave() {
    const content = await ref.current.saver.save();
    if (!title && (!content || content.blocks.length === 0)) {
      navigate('/');
      return;
    }

    const tempNotes = [...notes];
    if (currentEditableNote) {
      const note = {...tempNotes.find(x => x.id === currentEditableNote)};
      note.title = title;
      note.content = content;
      note.lastUpdate = moment().format();
      note.userId = profile.id;
      tempNotes[tempNotes.findIndex(x => x.id === note.id)] = note;

      dispatch(setNotes([...tempNotes]));
    } else {
      const newNote = createNote(title, content, parent, profile?.id);
      dispatch(setNotes([...tempNotes, newNote]));
    }
    navigate('/');
  }

  useEffect(() => {
    if (currentEditableNote) {
      const note = notes.find(x => x.id === currentEditableNote);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else {
        setContent([]);
      }
    } else {
      setContent([]);
    }
  }, [currentEditableNote, notes]);

  return (
      <div className="m-3 flex flex-col gap-1">
        <EditorHeader onBackAndSave={handleBackAndSave}/>
        <div className="flex flex-col gap-1 animate-slide">
        <textarea value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  className="text-2xl font-semibold p-2 resize-none outline-0 mt-3 mb-2 rounded-lg bg-slate-100"
                  placeholder="Заголовок"/>

          <Editor refValue={ref} data={content} onChange={setContent}
                  holder="editor"/>
        </div>
      </div>
  );
}

export default EditorPage;