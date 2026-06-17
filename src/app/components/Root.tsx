import { Outlet } from 'react-router';
import { AppProvider } from '../context/AppContext';

export default function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Outlet />
      </div>
    </AppProvider>
  );
}
