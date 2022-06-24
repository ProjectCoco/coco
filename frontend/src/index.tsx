import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root')
);
