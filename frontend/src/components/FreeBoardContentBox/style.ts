import styled from 'styled-components';

export const ContentBox = styled.div`
  border-bottom: 0.1rem solid lightgray;
  padding: 2rem 2rem 0 2rem;
  transition: all ease;
  &:hover {
    opacity: 50%;
    transition: all ease 0.3s 0s;
    cursor: pointer;
  }
`;
export const Content = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #666;
`;
export const Subject = styled.h1`
  font-weight: 700;
  margin-top: 1rem;
  font-size: 3rem;
  letter-spacing: 0.02rem;
  color: #555;
`;
export const UserLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;

  & > div {
    margin-bottom: 1.8rem;
  }
`;
export const UserImg = styled.img`
  margin-top: 2.5rem;
  width: 4rem;
  height: 4rem;
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
    color: #555;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: skyblue;

  & > h4 {
    color: #555;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

export const Author = styled.h4`
  @import url('https://fonts.googleapis.com/css2?family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap');
  margin: 4rem 1rem 0.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  & h4 {
    font-family: 'Radio Canada', sans-serif;
    font-family: 'Redressed', cursive;
    font-family: 'Roboto Flex', sans-serif;
    font-family: 'Signika', sans-serif;
  }
`;
export const Date = styled.div`
  font-size: 1.2rem;
  margin: 0rem 1rem 0rem;
  color: #888;
`;
