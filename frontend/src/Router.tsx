import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NaviHeader from './components/NaviHeader';
import React, { useEffect } from 'react';
import Signup from './pages/Signup/Signup';
import BoardWrite from './pages/BoardWrite';
import StudyBoardDetail from './pages/StudyBoardDetail';
import StudyBoard from './pages/StudyBoard/StudyBoard';
import PrivateRouter from './PrivateRouter';
import FreeBoard from './pages/FreeBoard';
import UserProfile from './pages/UserProfile';
import MyFavorPage from './pages/MyFavorPage';
import BoardEdit from './pages/BoardEdit';
import NotFound from './pages/NotFound/NotFound';
import MyCommentPage from '@pages/MyCommentPage';

const Router = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <NaviHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<NotFound />} />
        {/* login 되어 있어야만 접근 가능 */}
        <Route element={<PrivateRouter authentication={true} />}>
          <Route path="/my-favor" element={<MyFavorPage />} />
          <Route path="/my-comment" element={<MyCommentPage />} />
          <Route path="/study-board">
            <Route path="" element={<StudyBoard />} />
            <Route path=":id" element={<StudyBoardDetail />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="edit/:id" element={<BoardEdit />} />
          </Route>
          <Route path="/free-board">
            <Route path="" element={<FreeBoard />} />
          </Route>
          <Route path="/profile" element={<UserProfile />} />;
        </Route>
        {/* login 하지 않은 경우에만 접근 가능 */}
        <Route element={<PrivateRouter authentication={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />;
        </Route>
      </Routes>
    </>
  );
};

export default Router;
