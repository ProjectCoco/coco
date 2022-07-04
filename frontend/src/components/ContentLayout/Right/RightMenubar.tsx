import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

// dummies
import { DuBoardList, IDuBoardList } from '../../../dummys/dummy';
import commentImg from '../../../images/userProfile.jpg';

const RightMenubar = () => {
  const navigator = useNavigate();;
  const [posts, setPosts] = useState<IDuBoardList[]>();

  useEffect(() => {
    setPosts(() => DuBoardList);
  }, []);

  return (
    <>
      <S.LoginBox>
        <S.LoginButton onClick={() => navigator('/login')}>
          Sign In
        </S.LoginButton>
        <S.SignUpButton onClick={() => navigator('/signup')}>
          Sign Up
        </S.SignUpButton>
      </S.LoginBox>
      <S.MorePosts>
        <h1>More Posts</h1>
        {posts?.slice(1, 5).map((post, idx) => (
          <S.MorePost key={idx}>
            <S.MorePostsProfile>
              <S.MorePostsImg src={commentImg} />
              <h4>ghks042{post.id}</h4>
            </S.MorePostsProfile>
            <S.MorePostTitle>
              <div onClick={() => navigator(`/study-board/${post.id}`)}>
                {post.subject}
              </div>
            </S.MorePostTitle>
          </S.MorePost>
        ))}
      </S.MorePosts>
      <S.TagBoxTitle>Tag</S.TagBoxTitle>
      <S.TagBox>
        <S.Tag># 알고리즘</S.Tag>
        <S.Tag># 자바스크립트</S.Tag>
        <S.Tag># 스프링</S.Tag>
        <S.Tag># 자바</S.Tag>
        <S.Tag># 객체지향</S.Tag>
        <S.Tag># 리액트</S.Tag>
      </S.TagBox>
    </>
  );
};

export default RightMenubar;
