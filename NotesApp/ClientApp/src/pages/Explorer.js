import Layout from '../components/explorer/Layout';
import ItemsList from '../components/explorer/ItemsList';
import {useEffect} from 'react';
import {setFolders} from '../slicers/FoldersSlice';
import {setNotes} from '../slicers/NotesSlice';
import {setProfile} from '../slicers/ProfileSlice';
import {useDispatch, useSelector} from 'react-redux';
import {CreateProfile} from '../utils/CreateProfile';

function Explorer() {
  const profile = useSelector((state) => state.profile.profile);
  const notes = useSelector((state) => state.notes.notes);
  const folders = useSelector((state) => state.folders.folders);

  const dispatch = useDispatch();

  useEffect(() => {

    const localFolders = localStorage.getItem('folders');
    const localNotes = localStorage.getItem('notes');
    const localProfile = localStorage.getItem('profile');

    dispatch(setFolders(localFolders ? JSON.parse(localFolders) : []));
    dispatch(setNotes(localNotes ? JSON.parse(localNotes) : []));
    dispatch(setProfile(
        localProfile ? JSON.parse(localProfile) : CreateProfile({})));

  }, [dispatch]);

  /*useEffect(() => {
    const healthInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/sync',
            {
              method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, body: JSON.stringify({profile, folders, notes}),
            });
        dispatch(setIsOnline(true));
        const data = await res.json();
        if (data.needUpdate) {
          const {notes, folders, lastSync} = data;
          dispatch(setNotes(notes));
          dispatch(setFolders(folders));
          dispatch(setProfile({...profile, lastSync}));
        }
      } catch {
        dispatch(setIsOnline(false));
      }
    }, 5000);
    return () => {
      clearInterval(healthInterval);
    };
  }, [dispatch, folders, notes, profile]);*/

  return (
      <>
        <Layout>
          <div className="pb-12 pt-2">
            <ItemsList/>
          </div>
        </Layout>
      </>
  );
}

export default Explorer;