import styled from 'styled-components';

export const Header = styled.div`
  width: 90%;
  margin: auto;
`;
export const UserLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.9rem;
  & > div {
    margin-bottom: 1.8rem;
  }
`;
export const UserImg = styled.img`
  margin-top: 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;
export const FavoritBox = styled.div`
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
  & > svg {
    cursor: pointer;
  }
`;
export const Author = styled.h4`
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
export const Date = styled.div`
  font-size: 1.3rem;
  margin: 0rem 2rem 0rem;
  color: #888;
`;
export const Subject = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 4rem;
  letter-spacing: 0.02 rem;
`;
export const MainImg = styled.img`
  margin-top: 3rem;
  width: 100%;
`;
export const Body = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
`;
export const Content = styled.div`
  font-size: 2.5rem;
  color: #444;
`;
export const CommentBox = styled.div`
  margin: 10rem auto;
`;
export const CommentLength = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  height: 4rem;
  font-size: 3rem;
  & > p {
    font-size: 2rem;
  }
`;
export const CommentForm = styled.form`
  width: 100%;
  display: flex;
  height: 6rem;
`;
export const CommentInput = styled.input`
  flex: 9;
  font-size: 1.5rem;
  border: solid 2px skyblue;
  border-color: skyblue;
  padding-left: 1rem;
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
export const ShowComment = styled.div`
  border-bottom: solid 1px skyblue;
  margin: 1rem 0;
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  & > p {
    margin-top: 2rem;
    font-size: 2rem;
    color: #333;
  }
`;
export const CommentImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;
export const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;
