import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  padding: 3rem;
  border-radius: 1rem;
`;

export const IconContainer = styled.p`
  font-size: 10rem;
  color: #ffbd4b;
  margin-left: -1.5rem;
  margin-bottom: 1rem;
  transform: rotate(-10deg);
`;

export const MessageBox = styled.p`
  font-size: 2.5rem;
  color: #555;
  margin-bottom: 1rem;
`;

export const SubmessageBox = styled.p`
  font-size: 2rem;
  color: gray;
  margin-bottom: 5rem;
`;

export const ButtonContainter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavigateButton = styled.button`
  margin-top: 2rem;
  background-color: #5de0e6;
  color: #fff;
  font-weight: 600;
  height: 4rem;
  width: 48%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;
