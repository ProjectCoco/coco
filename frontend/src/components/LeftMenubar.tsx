import React from 'react';
import styled from 'styled-components';
import {
  MdOutlineHome,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardBackspace,
} from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import { IoMdPaper } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const LeftMenubar = () => {
  const navigator = useNavigate();

  return (
    <Container>
      <Home>
        <MdOutlineHome onClick={() => navigator('/')} />
      </Home>
      <Favor>
        <MdOutlineFavoriteBorder />
      </Favor>
      <LinkCommnet href={'#CommentBox'}>
        <AiOutlineComment />
      </LinkCommnet>
      <GoBack>
        <MdOutlineKeyboardBackspace onClick={() => navigator('/study-board')} />
      </GoBack>
      <Hr>
        <hr />
      </Hr>
      <Write>
        <IoMdPaper />
      </Write>
    </Container>
  );
};

export default LeftMenubar;

const Container = styled.div`
  width: 5rem;
  padding: 2rem;
  margin-right: 1rem;
  color: gray;
  font-size: 3rem;
`;

const Home = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    color: black;
    transform: scale(1.1);
  }
`;

const Favor = styled.div`
  padding: 1rem;

  &:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.1);
  }
`;

const LinkCommnet = styled.a`
  padding: 1rem;

  color: gray;
  display: inline-block;
  &:hover {
    color: skyblue;
    transform: scale(1.1);
  }
`;

const GoBack = styled.div`
  padding: 1rem;

  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const Write = styled.div`
  padding: 1rem;

  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const Hr = styled.div`
  padding: 1rem;
`;
