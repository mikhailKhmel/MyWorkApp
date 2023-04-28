import {SyncErrorIcon} from '../../svgs/sync-error-icon';
import {useSelector} from 'react-redux';

export default function SyncButton() {
  const isOnline = useSelector((state) => state.profile.isOnline);

  return (
      <>
        {!isOnline && <SyncErrorIcon/>}
      </>
  );
}