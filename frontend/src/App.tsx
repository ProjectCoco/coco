import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
