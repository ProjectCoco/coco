import { postSignupApi } from '../../apis/apiClient';
import { SignupInfo } from '@/lib/types';
import React, { useState } from 'react';
import InputComp from './components/InputComp';
import * as S from './style';

const SignupTest = () => {
  const [signupData, setSignupData] = useState<SignupInfo>({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    groupInfo: '',
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(signupData);
    /*     (signupData.email, signupData.password, signupData.username !== '')
      ? postSignupApi(signupData)
      : console.log('fail'); */
  };

  return (
    <S.Container>
      <S.SignUpContainer>
        <S.SignUpTextBox>
          <h1>Sign Up</h1>
          <p>Sign up to join</p>
        </S.SignUpTextBox>
        <S.SignUpForm onSubmit={onSubmit}>
          <InputComp
            inputLabel="EMAIL"
            inputName="email"
            inputType="email"
            inputValue={signupData.email}
            atComplete="off"
            textChange={(t) => setSignupData({ ...signupData, email: t })}
          />

          <InputComp
            inputLabel="PASSWORD"
            inputName="password"
            inputType="password"
            inputValue={signupData.password}
            atComplete="off"
            textChange={(t) => setSignupData({ ...signupData, password: t })}
          />

          <InputComp
            inputLabel="CONFIRM PASSWORD"
            inputName="passwordConfirm"
            inputType="password"
            inputValue={signupData.passwordConfirm}
            atComplete="off"
            textChange={(t) =>
              setSignupData({ ...signupData, passwordConfirm: t })
            }
          />

          <InputComp
            inputLabel="USERNAME"
            inputName="username"
            inputValue={signupData.username}
            atComplete="off"
            textChange={(t) => setSignupData({ ...signupData, username: t })}
          />

          <S.SignUpButton>Sign Up</S.SignUpButton>
        </S.SignUpForm>
      </S.SignUpContainer>
    </S.Container>
  );
};
export default SignupTest;
