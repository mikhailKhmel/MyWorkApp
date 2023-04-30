import Layout from '../components/explorer/Layout';
import ItemsList from '../components/explorer/ItemsList';
import {useEffect} from 'react';
import {setFolders} from '../slicers/FoldersSlice';
import {setNotes} from '../slicers/NotesSlice';
import {setProfile} from '../slicers/ProfileSlice';
import {useDispatch, useSelector} from 'react-redux';
import {CreateProfile} from '../utils/CreateProfile';

function Explorer() {
  

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