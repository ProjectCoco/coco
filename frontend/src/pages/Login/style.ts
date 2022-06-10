import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginImgBox = styled.div`
  margin-top: 2rem;
  caret-color: rgba(0, 0, 0, 0);
`;
export const LoginImg = styled.img``;
export const LoginTextBox = styled.div`
  text-align: center;
`;
export const LoginMainText = styled.h1`
  font-size: 4rem;
  color: #5de0e6;
  font-weight: 500;
`;
export const LoginSubText = styled.p`
  font-size: 1.5rem;
  color: #5de0e6;
`;

export const LoginForm = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 35rem;
  justify-content: center;
`;

export const EmailInputBox = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;
export const EmailInput = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;

export const PasswordInputBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;

export const PasswordInput = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;

export const LoginButton = styled.button`
  margin-top: 3rem;
  background-color: #5de0e6;
  color: #fff;
  height: 4rem;
  width: 50%;
  font-weight: 600;
  margin-left: 25%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;

export const ErrorText = styled.p`
  margin-top: 0.1rem;
  color: red;
`;

export const ForgotBox = styled.div`
  margin-top: 2rem;
  & a {
    color: #444;
    font-size: 1.2rem;

    text-decoration: none;
  }

  & a:first-child {
    padding-right: 1rem;
  }

  & a:last-child {
    padding-left: 1rem;
  }
`;

export const ButtonBox = styled.div`
  margin-left: 7rem;
`;
