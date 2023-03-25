import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard';
import Post from './pages/Post';
import Home from './pages/Home';
import CurrentPost from './pages/CurrentPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth/login', element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'post', element: <Post /> },
      { path: ':id', element: <CurrentPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
