import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import BoardListPage from './pages/BoardListPage';
//import BoardFormPage from 'pages/BoardFormPage';
import BoardCreateForm from './pages/BoardCreatePage'
import BoardModifyForm from './pages/BoardModifyPage'
import BoardDetail from './pages/BoardDetailPage'
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
//import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PetFormPage from './pages/PetFormPage';
import MainPage from './pages/Main';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/main" />, index: true },
        { path: 'main', element: <MainPage /> },
        // { path: 'todo', element: <TodoPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/petform',
      element: <DashboardLayout />,
      children: [
        { element: <PetFormPage />, index: true },
      ],
    },
    {
      path: '/board',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/board/list/all" />, index: true },
        { path: ':boardId', element: <BoardDetail  /> },
        { path: 'create', element: <BoardCreateForm /> },
        { path: 'modify/:boardId', element: <BoardModifyForm />},
        { path: 'list/:category', element: <BoardListPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
