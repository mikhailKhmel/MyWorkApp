import {FolderIcon} from '../../svgs/folder-icon';
import {NoteTextIcon} from '../../svgs/note-text-icon';
import {WrenchIcon} from '../../svgs/wrench-icon';
import {AngleRightIcon} from '../../svgs/angle-right-icon';
import {ThemeIcon} from '../../svgs/theme-icon';
import {CloudIcon} from '../../svgs/cloud-icon';

const TextLength = 20;

const icons = {
  'folder': <FolderIcon/>,
  'note': <NoteTextIcon/>,
  'setting': <WrenchIcon/>,
  'theme': <ThemeIcon/>,
  'sync': <div className="w-7 h-7"><CloudIcon/></div>,
};

function Item(props) {
  const {action, type, text} = props;

  return (
      <div onClick={action}
           className="p-2 rounded-md flex flex-row justify-between items-center cursor-pointer sm:hover:bg-slate-100 dark:bg-neutral-600 hover:dark:bg-neutral-500"
           key={'-1'}>
        <div className="flex flex-row gap-3 items-center">
          {icons[type]}
          {text.length >= TextLength
              ? text.substring(0, TextLength) + '...'
              : text}
        </div>
        <div>
          <AngleRightIcon/>
        </div>
      </div>
  );
}

export default Item;