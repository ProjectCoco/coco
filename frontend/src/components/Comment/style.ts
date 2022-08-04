import styled from 'styled-components';

export const CommentImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;
export const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & > div:first-child {
    width: 10%;
    position: relative;
  }
  & > div:nth-child(2) {
    width: 80%;
  }
  & > div > h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  & > div > h3 {
    font-size: 0.5rem;
    color: #555;
  }
  & > div:last-child {
  }
`;
export const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;
export const IconAlign = styled.div`
  width: 20%;
  & > svg {
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
  }
`;
export const EditComment = styled.div`
  display: flex;
  & > textarea {
    flex: 9;
    font-size: 1.5rem;
    border: solid 2px skyblue;
    border-color: skyblue;
    padding-left: 1rem;
  }
`;
export const Button = styled.button`
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
