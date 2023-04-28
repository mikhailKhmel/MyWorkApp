import Explorer from './pages/Explorer';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import SettingsPage from './pages/SettingsPages/SettingsPage';
import ThemePage from './pages/SettingsPages/ThemePage';
import SyncPage from './pages/SettingsPages/SyncPage';

const AppRoutes = [
  {
    index: true,
    element: <Home/>,
  },
  {
    path: '/explorer',
    element: <Explorer/>,
  },
  {
    path: '/editor',
    element: <EditorPage/>,
  },
  {
    path: '/settings',
    element: <SettingsPage/>,
  },
  {
    path: '/settings/theme',
    element: <ThemePage/>,
  },
  {
    path: '/settings/sync',
    element: <SyncPage/>,
  },
];

export default AppRoutes;
