import React, {useState, useEffect} from 'react';
import * as signalR from '@microsoft/signalr';
import SignalRContext from './SignalRContext';
import {useDispatch, useSelector} from 'react-redux';
import {setIsOnline, setProfile} from '../slicers/ProfileSlice';
import {setNotes} from '../slicers/NotesSlice';
import {setFolders} from '../slicers/FoldersSlice';

const SignalRProvider = ({children}) => {
  const [connection, setConnection] = useState(null);
  const dispatch = useDispatch();

  const profile = useSelector(state => state.profile.profile);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder().withUrl('/hub').
        withAutomaticReconnect().
        build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {

      connection.on('UpdateData', async () => {
        if (profile && profile.id && profile.id !== '') {
          const res = await fetch('/sync/getdata/' + profile.id, {method: 'GET'});
          const data = await res.json();
          const {notes, folders, profile} = data;
          dispatch(setNotes(notes));
          dispatch(setFolders(folders));
          dispatch(setProfile(profile));
        }
      });

      connection.onclose(() => {
        console.log('onclose');
        dispatch(setIsOnline(false));
      });

      connection.onreconnected((connectionId) => {
        console.log('onreconnected');
        dispatch(setIsOnline(true));
      });

      connection.onreconnecting((error) => {
        console.log('onreconnecting');
        dispatch(setIsOnline(false));
      });

      connection.start().
          then(() => {
            console.log('SignalR Connected');
            dispatch(setIsOnline(true));

            if (profile && profile.id && profile.id !== '') {
              connection.invoke('Enter', connection.connectionId, profile.id);
            }
          }).
          catch((err) => {
            console.error('SignalR Connection Error: ', err);
            dispatch(setIsOnline(false));
          });
    }
  }, [connection]);

  return (
      <SignalRContext.Provider value={connection}>
        {children}
      </SignalRContext.Provider>
  );
};

export default SignalRProvider;