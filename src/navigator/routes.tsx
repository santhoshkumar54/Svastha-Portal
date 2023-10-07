import Dashboard from '../components/layouts/dashboard';
import Users from '../components/layouts/users';

interface CustomRouteProps {
  title: string;
  path: string;
  exact: boolean;
  component: React.ComponentType<any>;
}

export const routes: CustomRouteProps[] = [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: '/users',
    exact: true,
    component: Users,
    title: 'Users',
  },
];
