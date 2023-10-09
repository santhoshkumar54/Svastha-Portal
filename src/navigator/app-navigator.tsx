import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthGuard from './auth-guard';
import SignIn from '../components/sign-in/sign-in';
import UnauthGuard from './unauth-guard';
import { routes } from './routes';

function AppNavigator() {
  return (
    <BrowserRouter basename={"/admin"}>
      <Routes>
        <Route
            key="login"
            path="/"
            element={<UnauthGuard Children={SignIn} />}
        />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AuthGuard Children={route.component} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppNavigator;