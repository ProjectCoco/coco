import styled from "styled-components";

interface Prop {
  subject: string;
  content: string;
  author: string;
  datetime: string;
  onClick: () => void;
}

const BoardList = ({ subject, content, author, datetime }: Prop) => {
  return (
    <>
      <Board>
        <Header>
          <div>{subject}</div>
          <Author>
            <div>{author}</div>
            <div>{datetime}</div>
          </Author>
        </Header>
        <Content>{content}</Content>
      </Board>
    </>
  );
};

const Board = styled.div``;
const Header = styled.div``;
const Author = styled.div``;
const Content = styled.div``;

export default BoardList;
