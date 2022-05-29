import { DuBoardList, IDuBoardList } from '../dummys/dummy';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import commentImg from '../images/userProfile.jpg';

const RightMenubar = () => {
  const navigator = useNavigate();
  const [posts, setPosts] = useState<IDuBoardList[]>();

  useEffect(() => {
    setPosts(() => DuBoardList);
  }, []);

  return (
    <>
      <LoginBox>
        <LoginButton>Sign In</LoginButton>
        <SignUpButton>Sign Up</SignUpButton>
      </LoginBox>
      <MorePosts>
        <h1>More Posts</h1>
        {posts?.slice(1, 5).map((post, idx) => (
          <MorePost key={idx}>
            <MorePostsProfile>
              <MorePostsImg src={commentImg} />
              <h4>ghks042{post.id}</h4>
            </MorePostsProfile>
            <MorePostTitle>
              <div onClick={() => navigator(`/study-board/${post.id}`)}>
                {post.subject}
              </div>
            </MorePostTitle>
          </MorePost>
        ))}
      </MorePosts>
      <TagBoxTitle>Tag</TagBoxTitle>
      <TagBox>
        <Tag># 알고리즘</Tag>
        <Tag># 자바스크립트</Tag>
        <Tag># 스프링</Tag>
        <Tag># 자바</Tag>
        <Tag># 객체지향</Tag>
        <Tag># 리액트</Tag>
      </TagBox>
    </>
  );
};

export default RightMenubar;
const LoginBox = styled.div`
  margin: 5rem;
  display: flex;
  width: 50%;
`;

const LoginButton = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap');
  font-family: 'Playfair Display', serif;
  flex: 6.5;
  width: 30%;
  height: 4rem;
  border-radius: 25rem;
  background-color: #222121;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: none;

  &:hover {
    background-color: black;
  }
`;

const SignUpButton = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap');
  font-family: 'Playfair Display', serif;

  flex: 3.5;
  height: 4rem;
  border: none;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  color: #555;

  &:hover {
    color: black;
  }
`;

const MorePosts = styled.div`
  margin: 10rem 5rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 400;
  }
`;

const MorePost = styled.div`
  padding: 0.5rem 0.2rem;
`;

const MorePostsProfile = styled.div`
  display: flex;
  align-items: center;

  & > h4 {
    padding: 0.7rem;
    font-size: 1.2rem;
  }
`;

const MorePostsImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const MorePostTitle = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  padding-top: 0.5rem;
  cursor: pointer;
`;

const TagBox = styled.div`
  margin-top: 1rem;
  margin-left: 4rem;
  display: flex;
  flex-wrap: wrap;
  width: 45%;
  border: solid 1px skyblue;
  border-radius: 1rem;
`;

const TagBoxTitle = styled.h1`
  margin-left: 4rem;
  color: skyblue;
  font-size: 2rem;
`;

const Tag = styled.a`
  background-color: skyblue;
  opacity: 0.7;
  color: #fff;
  font-size: 1.4rem;
  margin: 0.6rem;
  border-radius: 0.8rem;
  padding: 0.4rem;
  cursor: pointer;

  &:hover {
    opacity: 2;
  }
`;
