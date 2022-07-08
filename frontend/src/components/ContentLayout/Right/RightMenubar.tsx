import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
// dummies
import commentImg from '../../../images/userProfile.jpg';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';
import { AiOutlineSearch } from 'react-icons/ai';
interface postType {
  _id: string;
  title: string;
  content: string;
  author: string;
  createDate: string;
  favor: string | null;
}

const RightMenubar = () => {
  const navigator = useNavigate();
  const user = useRecoilValue(UserState);
  const { data } = useQuery('RecentData', () =>
    fetch(`http://localhost:8080/api/content?page=${0}`).then((res) =>
      res.json()
    )
  );

  useEffect(() => {
    // setPosts(() => DuBoardList);
  }, []);

  return (
    <>
      <S.LoginBox>
        {user.email ? (
          <S.SearchBox>
            <S.SearchInput type="text" />
            <span>
              <AiOutlineSearch />
            </span>
          </S.SearchBox>
        ) : (
          <>
            <S.LoginButton onClick={() => navigator('/login')}>
              Sign In
            </S.LoginButton>
            <S.SignUpButton onClick={() => navigator('/signup')}>
              Sign Up
            </S.SignUpButton>
          </>
        )}
      </S.LoginBox>
      <S.MorePosts>
        <h1>Recent Posts</h1>
        {data?.slice(0, 3).map((post: postType) => (
          <S.MorePost key={post._id}>
            <S.MorePostsProfile>
              <S.MorePostsImg src={commentImg} />
              <h4>{post.author}</h4>
            </S.MorePostsProfile>
            <S.MorePostTitle>
              <div onClick={() => navigator(`/study-board/${post._id}`)}>
                {post.title}
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
