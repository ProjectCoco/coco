import { postSignupApi } from '../../apis/apiClient';
import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
  isValidEmail,
  isValidGroupInfo,
  isValidPassword,
  isValidPasswordConfirm,
  isValidUsername,
} from '../../lib/signupValidation';
import useInput from '../../hooks/useInput';
import useSelect from '../../hooks/useSelect';
import useDebounce from '../../hooks/useDebounce';
import { apiClient } from '../../apis/apiClient';

const Signup = () => {
  const email = useInput('', isValidEmail);
  const password = useInput('', isValidPassword);
  const passwordConfirm = useInput('', (val) =>
    isValidPasswordConfirm(val, password.input)
  );
  const username = useInput('', isValidUsername);
  const groupInfo = useSelect('', isValidGroupInfo);

  const debounceUsername = useDebounce(username.input, 500);
  const [duplicateMessage, setDuplicateMessage] = useState<string>('');

  useEffect(() => {
    if (username.input && !username.errorMessage) {
      checkUsername(username.input);
    }
  }, [debounceUsername]);

  const checkUsername = async (username: string) => {
    try {
      const request = await apiClient.post(username);
      console.log('request', request);
    } catch (error) {
      setDuplicateMessage('서버 통신 에러입니다.'); // 추후 삭제
      console.log('error', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      email.input &&
      password.input &&
      passwordConfirm.input &&
      username.input &&
      groupInfo.input &&
      !email.errorMessage &&
      !password.errorMessage &&
      !passwordConfirm.errorMessage &&
      !username.errorMessage &&
      !groupInfo.errorMessage
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
    } else {
      alert('모든 항목이 입력되었는지 확인해주세요.');
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
              <S.ErrorText>{email.errorMessage}</S.ErrorText>
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
              <S.ErrorText>{password.errorMessage}</S.ErrorText>
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
              <S.ErrorText>{passwordConfirm.errorMessage}</S.ErrorText>
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
              <S.ErrorText>
                {username.errorMessage || duplicateMessage}
              </S.ErrorText>
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
              <S.ErrorText>{groupInfo.errorMessage}</S.ErrorText>
            </S.InputBox>
            <S.SignUpButton>Sign Up</S.SignUpButton>
          </S.SignUpForm>
        </S.SignUpContainer>
      </S.Container>
    </>
  );
};

export default Signup;
