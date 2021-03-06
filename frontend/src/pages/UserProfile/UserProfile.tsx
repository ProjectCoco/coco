import { UserState } from '../../lib/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Resizer from 'react-image-file-resizer';
import CustomButton from '../../components/CustomButton';
// 나중에 API Clinent로 통합해야하는 부분 (삭제될 코드)
import axios, { AxiosRequestHeaders } from 'axios';
import { getCookie, setCookie } from '../../lib/cookie/cookie';
import { checkUsernameApi } from '../../apis/apiClient';
import useDebounce from '../../hooks/useDebounce';

const headers: AxiosRequestHeaders = {
  Authorization: `Bearer ${getCookie('accessToken')}`,
};

const cookieOptions = {
  path: '/',
};

function UserProfile() {
  const [userState, setUserState] = useRecoilState(UserState);
  const [imgText, setImgText] = useState('');
  const [username, setUserName] = useState(userState.username);
  const debounceUsername = useDebounce(username, 500);
  const [exist, setExist] = useState('');
  const [inputCheck, setInputCheck] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const revise_form = {
      email: userState.email,
      groupInfo: '39th',
      profileImg: userState.profileImg,
      username,
    };
    console.log('Revise_Form', revise_form);
    const response = axios.put(
      `http://localhost:8080/api/userprofile/${userState.username}`,
      revise_form,
      { headers }
    );

    setUserState({ ...userState, username });
    const AccessToken = (await response).headers.authorization.split(' ')[1];
    setCookie('accessToken', AccessToken, cookieOptions);
    location.reload(); // 6. 토큰이 제대로 들어가기 위해서 새로고침
  }

  useEffect(() => {
    if (inputCheck) {
      (async () => {
        const response = await checkUsernameApi(username);
        if (response === false) {
          setExist('존재하는 아이디 입니다.');
        } else {
          setExist('');
        }
      })();
    }
  }, [debounceUsername]);

  function fileChangedHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setImgText(file.name);
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          setUserState({ ...userState, profileImg: uri });
        },
        'base64',
        200,
        200
      );
    }
  }

  return (
    <ProfileContainer>
      <RevisionForm onSubmit={handleSubmit}>
        <Title>UserProfile</Title>
        <AvatarBox>
          <Avatar src={userState.profileImg + ''} alt="avatar" />
        </AvatarBox>
        <FileBox>
          <input
            type={''}
            placeholder="아바타를 업로드 해주세요."
            disabled={true}
            value={imgText}
          />
          <label htmlFor="user_avatar">Upload</label>
          <FileInput
            id="user_avatar"
            type="file"
            onChange={fileChangedHandler}
          />
        </FileBox>
        <InputBox>
          <label>email</label>
          <InputEmail type={'text'} value={userState.email} disabled={true} />
        </InputBox>
        <InputBox>
          <label>username</label>
          <Input
            type={'text'}
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
              setInputCheck(true);
            }}
          />
          <ErrorText>{exist}</ErrorText>
        </InputBox>
        <CustomButton
          height="4rem"
          bgColor="#5de0e6"
          color="white"
          width="18rem"
          weight="bold"
        >
          Revision
        </CustomButton>
      </RevisionForm>
    </ProfileContainer>
  );
}

export default UserProfile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
`;

const RevisionForm = styled.form`
  margin-top: 5rem;
  border: solid 1px lightgray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: center;
  width: 50rem;
  height: 65rem;
`;

const Title = styled.h1`
  padding-top: 2rem;
  font-size: 4rem;
  color: #5de0e6;
  font-weight: 500;
`;

const AvatarBox = styled.div`
  margin: 4rem 0;
  width: 20rem;
  height: 20rem;
  border-radius: 70%;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Start File CSS
const FileBox = styled.div`
  display: flex;
  margin-right: 2.5rem;
  align-items: center;
  & input {
    width: 20rem;
    height: 3.3rem;
    margin-right: 1rem;
    padding-left: 1rem;
  }

  & label {
    text-align: center;
    font-size: 1.7rem;
    padding: 0.5rem 0.5rem;
    background-color: #5de0e6;
    border-radius: 2px;
    color: white;
    cursor: pointer;
    width: 7rem;
    height: 2.9rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;
// End File CSS

const Input = styled.input`
  width: 30rem;
  height: 4rem;
  margin-right: 2rem;
  padding-left: 1rem;
  border: none;
  background-color: #ececec;
  border-radius: 0.5rem;
`;

const InputEmail = styled.input`
  width: 30rem;
  height: 4rem;
  margin-right: 2rem;
  padding-left: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  & label {
    font-size: 1.4rem;
    color: #555;
  }
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: red;
`;
