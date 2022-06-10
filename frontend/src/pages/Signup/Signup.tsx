import { postSignupApi } from '../../apis/apiClient';
import React, { useState } from 'react';
import * as S from './style';
import {
  isValidEmail,
  isValidGroupInfo,
  isValidPassword,
  isValidPasswordConfirm,
  isValidUsername,
} from './lib/validators';
import useInput from './hooks/useInput';
import useSelect from './hooks/useSelect';

const Signup = () => {
  const email = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');
  const username = useInput('');
  const groupInfo = useSelect('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const errorMessage = isSubmitted
    ? {
        email: isValidEmail(email.input),
        password: isValidPassword(password.input),
        passwordConfirm: isValidPasswordConfirm(
          passwordConfirm.input,
          password.input
        ),
        username: isValidUsername(username.input),
        groupInfo: isValidGroupInfo(groupInfo.input),
      }
    : {
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        groupInfo: '',
      };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (
      isSubmitted &&
      !errorMessage.email &&
      !errorMessage.password &&
      !errorMessage.passwordConfirm &&
      !errorMessage.username &&
      !errorMessage.groupInfo
    ) {
      const response = await postSignupApi({
        email: email.input,
        password: password.input,
        passwordConfirm: passwordConfirm.input,
        username: username.input,
        groupInfo: groupInfo.input,
      });
      console.log(response);
      // TODO: response 성공, 실패
    }
  };

  return (
    <>
      <S.Container>
        <S.SignUpContainer>
          <S.SignUpTextBox>
            <S.SignUpMainText>Sign Up</S.SignUpMainText>
            <S.SignUpSubText>Sign up to join</S.SignUpSubText>
          </S.SignUpTextBox>
          <S.SignUpForm onSubmit={handleSubmit}>
            <S.InputBox>
              <label>EMAIL</label>
              <S.Input
                name="email"
                type="email"
                value={email.input}
                onChange={email.handleInput}
                autoComplete="off"
              />
              <S.ErrorText>{errorMessage.email}</S.ErrorText>
            </S.InputBox>
            <S.InputBox>
              <label>PASSWORD</label>
              <S.Input
                name="password"
                type="password"
                value={password.input}
                onChange={password.handleInput}
                autoComplete="off"
              />
              <S.ErrorText>{errorMessage.password}</S.ErrorText>
            </S.InputBox>
            <S.InputBox>
              <label>CONFIRM PASSWORD</label>
              <S.Input
                name="passwordConfirm"
                type="password"
                value={passwordConfirm.input}
                onChange={passwordConfirm.handleInput}
                autoComplete="off"
              />
              <S.ErrorText>{errorMessage.passwordConfirm}</S.ErrorText>
            </S.InputBox>
            <S.InputBox>
              <label>USERNAME</label>
              <S.Input
                name="username"
                type="text"
                value={username.input}
                onChange={username.handleInput}
                autoComplete="off"
              />
              <S.ErrorText>{errorMessage.username}</S.ErrorText>
            </S.InputBox>
            <S.InputBox>
              <label>GROUPINFO</label>
              <S.GroupInfoInput
                name="groupInfo"
                value={groupInfo.input}
                onChange={groupInfo.handleInput}
              >
                <option value="">선택</option>
                <option value="39">39th</option>
                <option value="40">40th</option>
              </S.GroupInfoInput>
              <S.ErrorText>{errorMessage.groupInfo}</S.ErrorText>
            </S.InputBox>
            <S.SignUpButton>Sign Up</S.SignUpButton>
          </S.SignUpForm>
        </S.SignUpContainer>
      </S.Container>
    </>
  );
};

export default Signup;
