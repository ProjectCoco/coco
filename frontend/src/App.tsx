import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
