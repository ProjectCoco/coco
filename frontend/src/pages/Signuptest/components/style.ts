import styled from 'styled-components';

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;
export const Input = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;
export const ErrorText = styled.p`
  margin-top: 0.1rem;
  font-size: 1rem;
  padding-left: 0.1rem;
  color: red;
`;
