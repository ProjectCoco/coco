import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 7rem;
  border-bottom: 0.1rem solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: white;
  z-index: 2;
`;
export const Logo = styled.div`
  margin-left: 1rem;
  cursor: pointer;
  display: flex;
`;
export const LogoText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #444;
  caret-color: rgba(0, 0, 0, 0);
`;
export const LogoImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  position: relative;
`;
export const MenuListContent = styled.li<{ isPathMatch: boolean }>`
  margin-right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  caret-color: rgba(0, 0, 0, 0);
  color: ${(prop) => (prop.isPathMatch ? '#56b6e7' : 'black')};
`;

export const WeatherIconBox = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 5rem;

  img {
    width: 70%;
    height: 70%;
  }
`;
