import React, {useContext, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {useDispatch, useSelector} from 'react-redux';
import {setFolders} from './slicers/FoldersSlice';
import {setNotes} from './slicers/NotesSlice';
import {setIsOnline, setProfile} from './slicers/ProfileSlice';
import {CreateProfile} from './utils/CreateProfile';
import SignalRContext from './components/SignalRContext';

export default function App() {
  const connection = useContext(SignalRContext);

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

  useEffect(() => {
    if (connection && connection._connectionState === 'Connected' &&
        profile.id !== '') {
      fetch('/Sync',
          {
            method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, body: JSON.stringify({userId: profile.id, folders, notes}),
          }).then(async (response) => {
        const data = await response.json();
        const {notes, folders, lastSync} = data;
        dispatch(setNotes(notes));
        dispatch(setFolders(folders));
        dispatch(setProfile({...profile, lastSync}));
      }).catch((error) => {
        setIsOnline(false);
      });
    }

  }, [connection, folders, notes, profile]);

  return (
      <Routes>
        {AppRoutes.map((route, index) => {
          const {element, ...rest} = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
      </Routes>
  );

}
