import { postLoginApi } from '../../../apis/apiClient';
import React, { useState } from 'react';
import { handleValidation, IFormInput } from '../lib/handleValidation';
import * as S from '../style';
import CustomButton from '../../../components/CustomButton';

function LoginForm() {
  const [errorText, setErrorText] = useState<string>('');
  const [formdata, setFormData] = useState<IFormInput>({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = handleValidation(formdata);
    result === false
      ? setErrorText(
          'email 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 email 입니다.'
        )
      : setErrorText('');
    if (result) {
      const response = await postLoginApi(formdata);
      console.log(response);
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
      {/* <S.LoginButton>Login</S.LoginButton> */}
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
