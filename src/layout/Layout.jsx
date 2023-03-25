import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <main className="font-poppins mx-6 md:max-w-2xl md:mx-auto">
      <ToastContainer limit={1} />
      <Navbar />
      <Outlet />
    </main>
  );
}

export default Layout;
