import { Route, Routes } from 'react-router-dom';
import StudyBoard from './pages/StudyBoard';
import Main from './pages/Main';
import Login from './pages/Login';
import NaviHeader from './components/NaviHeader';
import StudyBoardDetail from './pages/StudyBoardDetail';
import StudyBoardWrite from './pages/StudyBoardWrite';
import React from 'react';

const Router = () => {
  return (
    <>
      <NaviHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/study-board" element={<StudyBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/study-board/:id" element={<StudyBoardDetail />} />
        <Route path="/study-board-write" element={<StudyBoardWrite />} />
      </Routes>
    </>
  );
};

export default Router;
