import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <>
      <CookiesProvider>
        <RecoilRoot>
          <BrowserRouter>
            <GlobalStyle />
            <Router />
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
}

export default App;
