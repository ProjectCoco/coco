import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { __isLoading } from './lib/atom';
import Loading from './components/Loading';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const isLoading = useRecoilValue(__isLoading);
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Suspense fallback={isLoading ? <Loading /> : null}>
          <BrowserRouter>
            <GlobalStyle />
            <Router />
          </BrowserRouter>
        </Suspense>
      </CookiesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
