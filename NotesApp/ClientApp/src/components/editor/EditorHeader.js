import EditorMenu from './EditorMenu';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {ArrowLeftIcon} from '../../svgs/arrow-left-icon';
import {MenuIcon} from '../../svgs/menu-icon';

function EditorHeader(props) {
  const {onBackAndSave} = props;
  const [openDropdown, setOpenDropdown] = useState(false);
  const currentEditableNote = useSelector(
      state => state.notes.currentEditableNote);
  return (
      <div
          className="flex flex-row py-1 items-center justify-between">
        <button onClick={onBackAndSave}
                className="p-2 flex flex-row items-center cursor-pointer rounded-md sm:hover:bg-slate-100 hover:dark:bg-neutral-600">
          <ArrowLeftIcon/> Назад
        </button>
        {
            currentEditableNote && <div className="relative inline-block">
              <button
                  className="transition-all ease-in-out active:scale-125 sm:hover:scale-125"
                  onClick={() => setOpenDropdown(!openDropdown)}>
                <MenuIcon/>
              </button>

              <EditorMenu open={openDropdown}
                          onClose={() => setOpenDropdown(false)}/>
            </div>
        }
      </div>
  );
}

export default EditorHeader;