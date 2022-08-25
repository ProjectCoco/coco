import styled from 'styled-components';

export const BoardListContainer = styled.div`
  font-size: 2rem;
`;
export const Body = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
  & > button {
    border: none;
    background-color: inherit;
  }
`;
export const Content = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #444;
`;
export const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;
export const RemoveBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 3rem;
  height: 2rem;
`;
