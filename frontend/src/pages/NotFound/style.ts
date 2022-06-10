import styled from 'styled-components';

export const NotFoundCotainer = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;

export const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const NotFoundImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const GoHomeButton = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
  color: #fff;
  background-color: skyblue;
  width: 40%;
  height: 4rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-family: 'Archivo Black', sans-serif;
  font-weight: bold;
  transition-delay: 10ms;
  -webkit-box-shadow: -4px -1px 35px 16px rgba(186, 186, 186, 0.14);
  -moz-box-shadow: -4px -1px 35px 16px rgba(186, 186, 186, 0.14);
  box-shadow: -4px -1px 35px 16px rgba(186, 186, 186, 0.14);
  &:hover {
    transform: scale(0.98);
  }
`;
