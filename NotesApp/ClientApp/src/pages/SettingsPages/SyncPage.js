import {ArrowLeftIcon} from '../../svgs/arrow-left-icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useContext, useState} from 'react';
import {setProfile} from '../../slicers/ProfileSlice';
import {setNotes} from '../../slicers/NotesSlice';
import {setFolders} from '../../slicers/FoldersSlice';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import SignalRContext from '../../components/SignalRContext';
import {CreateProfile} from '../../utils/CreateProfile';

function Sync() {
  const connection = useContext(SignalRContext);
  const router = useNavigate();
  const profile = useSelector(state => state.profile.profile);
  const notes = useSelector(state => state.notes.notes);
  const folders = useSelector(state => state.folders.folders);
  const dispatch = useDispatch();

  const [token, setToken] = useState(profile.token);
  const [errorMsg, setErrorMsg] = useState({ok: false, message: ''});

  function handleBack() {
    router('/settings');
  }

  async function handleSubmit() {
    setErrorMsg({ok: false, message: ''});
    if (token) {
      const result = await fetch('/token',
          {
            method: 'POST', headers: {
              'Content-Type': 'application/json',
            }, body: JSON.stringify(token),
          });

      if (result.ok) {
        const {Id, IsActive, LastSync, Token} = await result.json();
        const profile = CreateProfile({Id, Token, IsActive, LastSync});
        dispatch(setProfile(profile));

        // Установка ID пользователя в заметки и папки
        const tempNotes = [];
        const tempFolders = [];
        for (let note of notes) {
          tempNotes.push({...note, userId: profile.id});
        }
        for (let folder of folders) {
          tempFolders.push({...folder, userId: profile.id});
        }
        dispatch(setNotes(tempNotes));
        dispatch(setFolders(tempFolders));

        connection.invoke('Enter', connection.connectionId, profile.id);
        setErrorMsg({message: 'Пользователь найден!', ok: true});
      } else {
        setErrorMsg({
          message: 'Пользователя не существует. Обратитесь к администратору',
          ok: false,
        });
      }
    } else {
      setErrorMsg({message: 'Пустой ключ', ok: false});
    }
  }

  return (
      <div className="py-2 px-2 mt-3 flex flex-col gap-3">
        <div onClick={handleBack}
             className="max-w-fit p-2 flex flex-row items-center cursor-pointer rounded-md sm:hover:bg-slate-100 dark:bg-neutral-600 hover:dark:bg-neutral-500">
          <ArrowLeftIcon/> Назад
        </div>
        <div className="text-4xl font-bold">
          Синхронизация
        </div>
        <div>
          <div>Ваш ключ</div>
          <div className="flex flex-row gap-2">
            <Input value={token}
                   onChange={(event) => setToken(event.target.value)}/>
            <Button onClick={handleSubmit}>Отправить</Button>
          </div>
          <div
              className="mt-3 p-2 rounded-lg flex flex-col gap-1 bg-slate-100 dark:bg-neutral-700">
            <div>
              ID пользователя: {profile.id || 'Неизвестно'}
            </div>
            <div
                className={profile.isActive ?
                    'text-green-500 dark:text-green-300'
                    :
                    'text-red-500 dark:text-red-300'}>
              Статус: {profile.isActive ? 'Активен' : 'Неактивен'}
            </div>
            <div>
              Последняя синхронизация: {profile.lastSync ? moment(
                profile.lastSync).format('HH:mm:ss DD.MM.YYYY') : 'Никогда'}
            </div>
          </div>
          {errorMsg.message &&
              <div
                  className={`mt-3 p-2 rounded-lg flex flex-col gap-1 ${errorMsg.ok
                      ? 'bg-green-100 dark:bg-green-800'
                      : 'bg-red-200 dark:bg-red-800'}`}>
                {errorMsg.message}
              </div>
          }
        </div>
      </div>
  );
}

export default Sync;