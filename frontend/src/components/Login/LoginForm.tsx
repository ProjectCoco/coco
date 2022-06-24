import { postLoginApi } from '../../apis/apiClient';
import React, { useState } from 'react';
import { handleValidation, IFormInput } from '../../lib/loginhandleValidation';
import * as S from '../../pages/Login/style';
import CustomButton from '../CustomButton';
import { getCookie, setCookie } from '../../lib/cookie/cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../../lib/atom';
import { UserStateType } from '../../lib/types/';

function LoginForm() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>('');
  const SetUserInfo = useSetRecoilState(UserState);
  const [formdata, setFormData] = useState<IFormInput>({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = handleValidation(formdata); // 유효성 검사
    if (result === false) {
      setErrorText(
        'email 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 email 입니다.'
      );
    } else if (result) {
      const token = await postLoginApi(formdata); // 1. 로그인 정보를 서버로 보내서 성공하면 token 받음
      // 2. token을 쿠키에 저장
      setCookie('accessToken', String(token), {
        path: '/',
      });
      const decoded: UserStateType = jwt_decode(String(token)); // 3. token payload값만 decode
      SetUserInfo(decoded); // 4. decode 된 값을 atom 저장 (localStorage)
      getCookie('accessToken') && navigate('/'); // 5. 토큰 값이 잘 저장되었으면 홈으로 리다이렉트
      location.reload(); // 6. 토큰이 제대로 들어가기 위해서 새로고침
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <S.LoginForm onSubmit={handleSubmit}>
      <S.EmailInputBox>
        <label>EMAIL</label>
        <S.EmailInput name={'email'} type={'email'} onChange={handleChange} />
      </S.EmailInputBox>
      <S.PasswordInputBox>
        <label>PASSWORD</label>
        <S.PasswordInput
          type={'password'}
          name="password"
          autoComplete="off"
          onChange={handleChange}
        />
      </S.PasswordInputBox>
      <S.ErrorText>{errorText}</S.ErrorText>
      <S.ButtonBox>
        <CustomButton
          height="4rem"
          bgColor="#5de0e6"
          color="white"
          width="18rem"
          weight="bold"
        >
          Login
        </CustomButton>
      </S.ButtonBox>
    </S.LoginForm>
  );
}

export default LoginForm;
