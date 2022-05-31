import styled from 'styled-components';

export const ContentBox = styled.div`
  border-bottom: 0.1rem solid;
  margin-bottom: 3rem;
  transition: all ease;
  &:hover {
    transform: translateX(-3rem);
  }
`;
export const Content = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #444;
`;
export const Subject = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 4rem;
  letter-spacing: 0.02 rem;
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
  color: skyblue;

  & > h4 {
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
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
