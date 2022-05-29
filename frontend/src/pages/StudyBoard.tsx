import styled from 'styled-components';
import { DuBoardList } from '../dummys/dummy';
import { useNavigate } from 'react-router-dom';
// Import Icons
import { MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import profileImg2 from '../images/download.jpg';
import React from 'react';
import ContentLayout from '../components/ContentLayout';

const StudyBoard = () => {
  const navigator = useNavigate();

  return (
    <ContentLayout>
      <Body>
        <Content>
          <BoardListContainer>
            {DuBoardList.slice(0, 10).map((data, index) => (
              <ContentBox onClick={() => navigator(`${data.id}`)} key={index}>
                <Subject>{data.subject}</Subject>
                <Content>
                  {data.content.length > 235
                    ? `${data.content.slice(0, 235)}...`
                    : data.content}
                </Content>
                <UserLogo>
                  <UserBox>
                    <UserImg src={profileImg2} />
                    <div>
                      <Author>{data.author}</Author>
                      <Date>{data.datetime}</Date>
                    </div>
                  </UserBox>
                  <div style={{ display: 'flex' }}>
                    <FavoritBox>
                      <MdFavorite />
                      <h4>{data.favor}</h4>
                    </FavoritBox>
                    <FavoritBox style={{ marginLeft: '2rem' }}>
                      <AiOutlineComment />
                      <h4>{data.comment.length}</h4>
                    </FavoritBox>
                  </div>
                </UserLogo>
              </ContentBox>
            ))}
          </BoardListContainer>
        </Content>
        <Blank />
      </Body>
    </ContentLayout>
  );
};

const ContentBox = styled.div`
  border-bottom: 0.1rem solid;
  margin-bottom: 3rem;
  transition: all ease;
  &:hover {
    transform: translateX(-3rem);
  }
`;
const BoardListContainer = styled.div`
  font-size: 2rem;
`;
const Subject = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 4rem;
  letter-spacing: 0.02 rem;
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
  color: skyblue;

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
const Body = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
`;
const Content = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #444;
`;
const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;

export default StudyBoard;
