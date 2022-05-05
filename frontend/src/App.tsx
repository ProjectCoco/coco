import { GlobalStyle } from "./styles/GlobalStyle";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

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
