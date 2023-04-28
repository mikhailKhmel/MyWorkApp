import Item from '../../components/explorer/Item';
import {ArrowLeftIcon} from '../../svgs/arrow-left-icon';
import {useNavigate} from 'react-router-dom';

function Settings() {
  const settingsItems = [
    {
      key: 2,
      text: 'Синхронизация',
      type: 'sync',
      action: () => navigate('/settings/sync'),
    },
    {
      key: 1,
      text: 'Тема',
      type: 'theme',
      action: () => navigate('/settings/theme'),
    },
  ];

  const navigate = useNavigate();

  function handleBack() {
    navigate('/explorer');
  }

  return (
      <div className="p-2">
        <div className="mt-3">
          <div onClick={handleBack}
               className="max-w-fit p-2 flex flex-row items-center cursor-pointer rounded-md sm:hover:bg-slate-100 dark:bg-neutral-600 hover:dark:bg-neutral-500">
            <ArrowLeftIcon/> Назад
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {settingsItems.map((item) => {
            return <Item key={item.key} type={item.type} text={item.text}
                         action={item.action}/>;
          })}
        </div>


      </div>
  );
}

export default Settings;