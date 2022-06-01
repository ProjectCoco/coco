import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DuBoardList, IDuBoardList } from '../dummys/dummy';
// Import Images
import profileImg2 from '../images/download.jpg';
import mainImg from '../images/mainImg.jpg';
import commentImg from '../images/userProfile.jpg';
// Import Icons
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import ContentLayout from '../components/ContentLayout';
import { postCommentApi } from '../apis/apiClient';

const StudyBoardDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<IDuBoardList>();

  const [comment, setComment] = useState<string>('');
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentForm = {
      name: 'hwanmin',
      content: comment,
    };
    const response = await postCommentApi(commentForm);
    console.log(response);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  useEffect(() => {
    DuBoardList.find((board) =>
      board.id === Number(id) ? setData(board) : null
    );
  }, [id]);

  return (
    <ContentLayout>
      <Header>
        <UserLogo>
          <UserBox>
            <UserImg src={profileImg2} />
            <div>
              <Author>{data?.author}</Author>
              <Date>{data?.datetime}</Date>
            </div>
          </UserBox>
          <FavoritBox>
            {data?.favor ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
            <h4>{data?.favor}</h4>
          </FavoritBox>
        </UserLogo>
        <Subject>{data?.subject}</Subject>
        <MainImg src={mainImg} />
      </Header>
      <Body>
        <Content>{data?.content}</Content>
        <CommentBox id="CommentBox">
          <CommentLength>
            <AiOutlineComment />
            <p> 댓글 </p>
          </CommentLength>
          <CommentForm onSubmit={handleSubmit}>
            <CommentInput
              type={'text'}
              placeholder="댓글을 입력하려면 로그인을 해주세요."
              onChange={handleChange}
            />
            <Button>입력</Button>
          </CommentForm>
          {data?.comment.map((obj) =>
            obj.content.map((comment, idx) => (
              <ShowComment key={idx}>
                <CommentProfile>
                  <div>
                    <CommentImg src={commentImg} />
                  </div>
                  <div>
                    <h1>ghks4{comment.id}</h1>
                    <h3>2022-05-22</h3>
                  </div>
                </CommentProfile>
                <p>{comment.content}</p>
              </ShowComment>
            ))
          )}
        </CommentBox>
        <Blank></Blank>
      </Body>
    </ContentLayout>
  );
};

export default StudyBoardDetail;

const Header = styled.div`
  width: 90%;
  margin: auto;
`;
const UserLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.9rem;
  & > div {
    margin-bottom: 1.8rem;
  }
`;
const UserImg = styled.img`
  margin-top: 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;
const FavoritBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: red;
  & > h4 {
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
const Author = styled.h4`
  @import url('https://fonts.googleapis.com/css2?family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap');
  margin: 4rem 2rem 0rem;
  font-size: 1.5rem;
  color: black;
  & h4 {
    font-family: 'Radio Canada', sans-serif;
    font-family: 'Redressed', cursive;
    font-family: 'Roboto Flex', sans-serif;
    font-family: 'Signika', sans-serif;
  }
`;
const Date = styled.div`
  font-size: 1.3rem;
  margin: 0rem 2rem 0rem;
  color: #888;
`;
const Subject = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 4rem;
  letter-spacing: 0.02 rem;
`;
const MainImg = styled.img`
  margin-top: 3rem;
  width: 100%;
`;
const Body = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
`;
const Content = styled.p`
  font-size: 2.5rem;
  color: #444;
`;
const CommentBox = styled.div`
  margin: 10rem auto;
`;
const CommentLength = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  height: 4rem;
  font-size: 3rem;
  & > p {
    font-size: 2rem;
  }
`;
const CommentForm = styled.form`
  width: 100%;
  display: flex;
  height: 6rem;
`;
const CommentInput = styled.input`
  flex: 9;
  font-size: 1.5rem;
  border: solid 2px skyblue;
  border-color: skyblue;
  padding-left: 1rem;
`;
const Button = styled.button`
  flex: 1;
  background-color: skyblue;
  color: #fff;
  font-size: 1.7rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
`;
const ShowComment = styled.div`
  width: 80%;
  border-bottom: solid 1px skyblue;
  margin: 2rem 0;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-bottom: 1.5rem;
  & > p {
    margin-top: 2rem;
    font-size: 2rem;
    color: #333;
  }
`;
const CommentImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;
const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  & > div > h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  & > div > h3 {
    font-size: 0.5rem;
    color: #555;
  }
  & > div:last-child {
    padding-left: 1rem;
  }
`;
const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;
