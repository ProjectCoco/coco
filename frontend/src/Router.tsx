import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NaviHeader from './components/NaviHeader';
import React from 'react';
import Signup from './pages/Signup/Signup';
import BoardWrite from './pages/BoardWrite';
import StudyBoardDetail from './pages/StudyBoardDetail';
import StudyBoard from './pages/StudyBoard/StudyBoard';

const Router = () => {
  return (
    <>
      <NaviHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/study-board">
          <Route path="" element={<StudyBoard />} />
          <Route path=":id" element={<StudyBoardDetail />} />
          <Route path="write" element={<BoardWrite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />;
      </Routes>
    </>
  );
};

export default Router;
