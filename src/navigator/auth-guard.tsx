// AuthGuard.tsx

import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  // You can add more props if needed.
  Children: React.ComponentType<any>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ Children }) => {
  const [isLoggedIn, setIsloggedIn] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const isAuthenticated = !!Cookies.get("auth");
    if(isAuthenticated){
      setIsloggedIn(true);
    }else{
      navigate('/');
    }
  }

  React.useEffect(() => {
    console.log("UnAuth Guard");
    checkToken();
  }, []);

  return isLoggedIn ? <Children />: <></>;

};

export default AuthGuard;
