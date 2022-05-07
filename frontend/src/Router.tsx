import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import StudyBoard from "./pages/StudyBoard";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NaviHeader from "./components/NaviHeader";

const Router = () => {
  return (
    <>
      <NaviHeader />
      <BaseScreen>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/study-board" element={<StudyBoard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BaseScreen>
    </>
  );
};

const BaseScreen = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
`;

export default Router;
