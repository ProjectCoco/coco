import styled from 'styled-components';

export const Container = styled.div`
  width: 5rem;
  padding: 2rem;
  margin-right: 1rem;
  color: gray;
  font-size: 3rem;
`;
export const Home = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    color: black;
    transform: scale(1.1);
  }
`;
export const Favor = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.1);
  }
`;
export const LinkCommnet = styled.a`
  padding: 1rem;
  color: gray;
  display: inline-block;
  &:hover {
    color: skyblue;
    transform: scale(1.1);
  }
`;
export const GoBack = styled.div`
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;
export const Write = styled.div`
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;
export const Hr = styled.div`
  padding: 1rem;
`;
