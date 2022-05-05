import styled from "styled-components";
import { DuBoardList } from "../dummys/dummy";
import BoardList from "../components/BoardList";
import FavorCard from "../components/FavorCard";
import { useNavigate } from "react-router-dom";

const StudyBoard = () => {
  const navigate = useNavigate();

  return (
    <>
      <FavorContainer>
        {DuBoardList.slice(0, 4).map((item, index) => (
          <FavorCard
            onClick={() => navigate(`:${item.id}`)}
            key={index}
            subject={item.subject}
            content={item.content}
          />
        ))}
      </FavorContainer>
      <Search placeholder="검색내용" />
      <BoardListContainer>
        {DuBoardList.slice(0, 10).map((item, index) => (
          <BoardList
            onClick={() => navigate(`:${item.id}`)}
            key={index}
            subject={item.subject}
            content={item.content}
            author={item.author}
            datetime={item.datetime}
          />
        ))}
      </BoardListContainer>
    </>
  );
};

const FavorContainer = styled.div`
  width: 100%;
  margin-top: 10%;
  height: 10rem;
  border: 0.1rem solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Search = styled.input`
  width: 100%;
  margin: 3rem 0;
`;
const BoardListContainer = styled.div``;

export default StudyBoard;
