import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import ExplorerMenu from './ExplorerMenu';
import {MenuIcon} from '../../svgs/menu-icon';
import SyncButton from './SyncButton';

function ExplorerHeader() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [title, setTitle] = useState('');

  const {parent} = useSelector(state =>
      state.folders.filter,
  );
  const folders = useSelector(state =>
      state.folders.folders,
  );

  useEffect(() => {
    if (parent) {
      if (parent === -1) {
        setTitle('Все заметки');
      } else {
        setTitle(folders.find(x => x._id === parent).title);
      }
    } else {
      setTitle('Все папки');
    }

    setOpenDropdown(false);
  }, [parent, folders]);

  return (
      <>
        <div
            className="fixed top-0 w-full bg-white drop-shadow flex flex-row text-4xl font-semibold justify-between items-center py-2 px-5 rounded-b-md dark:bg-neutral-600">
          <div className="mb-1">{title}</div>
          <div className="flex flex-row gap-4">
            <SyncButton/>
            <button
                className="transition-all ease-in-out active:scale-125 sm:hover:scale-125"
                onClick={() => setOpenDropdown(!openDropdown)}>
              <MenuIcon/>
            </button>
          </div>
        </div>
        <ExplorerMenu open={openDropdown}
                      onClose={() => setOpenDropdown(false)}/>
      </>
  );
}

export default ExplorerHeader;