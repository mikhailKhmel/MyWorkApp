import {ArrowLeftIcon} from '../../svgs/arrow-left-icon';
import {useNavigate} from 'react-router-dom';
import {useTheme} from 'next-themes';

function Theme() {
  const {theme, setTheme} = useTheme();
  const navigate = useNavigate();

  /*useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);*/

  function handleBack() {
    navigate('/settings');
  }

  return (
      <div className="p-2 mt-3">
        <div onClick={handleBack}
             className="max-w-fit p-2 flex flex-row items-center cursor-pointer rounded-lg dark:bg-neutral-600 hover:dark:bg-neutral-500">
          <ArrowLeftIcon/> Назад
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-3xl font-bold">
            Тема
          </div>
          <div
              className="flex flex-row justify-between p-2 rounded-lg bg-slate-100 cursor-pointer dark:bg-neutral-600 hover:dark:bg-neutral-500"
              onClick={() => setTheme('light')}>
            <label>Светлая</label>
            <input type="radio" checked={theme === 'light'}
                   onChange={() => setTheme('light')}/>
          </div>
          <div
              className="flex flex-row justify-between p-2 rounded-lg bg-slate-100 cursor-pointer dark:bg-neutral-600 hover:dark:bg-neutral-500"
              onClick={() => setTheme('dark')}>
            <label>Темная</label>
            <input type="radio" checked={theme === 'dark'}
                   onChange={() => setTheme('dark')}/>
          </div>
          <div
              className="flex flex-row justify-between p-2 rounded-lg bg-slate-100 cursor-pointer dark:bg-neutral-600 hover:dark:bg-neutral-500"
              onClick={() => setTheme('system')}>
            <label>Системная</label>
            <input type="radio" checked={theme === 'system'}
                   onChange={() => setTheme('system')}/>
          </div>
        </div>
      </div>
  );
}

export default Theme;