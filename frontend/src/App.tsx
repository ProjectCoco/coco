import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { __isLoading } from './lib/atom';
import Loading from './components/Loading';

const LoadingHooker = () => {
  const isLoading = useRecoilValue(__isLoading);
  return isLoading ? <Loading /> : null;
};

const App = () => {
  return (
    <>
      <CookiesProvider>
        <RecoilRoot>
          <BrowserRouter>
            <LoadingHooker />
            <GlobalStyle />
            <Router />
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
};

export default App;
