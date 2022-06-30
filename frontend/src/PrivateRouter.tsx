import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserState } from './lib/atom';
import AccessWarning from './components/AccessWarning/AccessWarning';
import Main from './pages/Main';

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}

const PrivateRouter = ({
  authentication,
}: PrivateRouteProps): React.ReactElement => {
  const user = useRecoilValue(UserState);
  const isLogin = user.email ? true : false;

  if (authentication) {
    return isLogin ? (
      <Outlet />
    ) : (
      <AccessWarning message="로그인이 필요한 페이지입니다." />
    );
  } else {
    return isLogin ? <Main /> : <Outlet />;
  }
};

export default PrivateRouter;
