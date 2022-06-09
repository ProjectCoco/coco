import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoadingImg = styled.img`
  width: 35vh;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

export const LoadingTitle = styled.h1`
  font-size: 5rem;
  color: #5ce1e6;
`;

export const DotBox = styled.div`
  margin-top: 5rem;
  margin-left: 0.5rem;
  display: inline-block;
  div:nth-child(1) {
    animation-delay: 0.2s;
  }
  div:nth-child(2) {
    animation-delay: 0.4s;
  }
  div:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

export const RepeatDot = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: red;
  display: inline-block;
  margin: 0.2rem;
  animation: scaling 2.5s ease-in-out infinite;

  @keyframes scaling {
    0%,
    100% {
      transform: scale(0.2);
      background-color: #ffbd4b;
    }
    50% {
      transform: scale(1);
      background-color: #5ce1e6;
    }

    75% {
      background-color: #ffbd4b;
      transform: scale(0.7);
    }
  }
`;
