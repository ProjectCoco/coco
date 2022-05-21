import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Prop {
  subject: string;
  content: string;
  author: string;
  datetime: string;
  id: number;
}

const BoardList = ({ subject, content, author, datetime, id }: Prop) => {
  const navigator = useNavigate();
  return (
    <>
      <Board onClick={() => navigator(`${id}`)}>
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
