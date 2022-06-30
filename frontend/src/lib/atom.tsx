import { atom, selector } from 'recoil';
import { UserStateType } from './types';
import { recoilPersist } from 'recoil-persist';

export const __Session = atom({
  key: 'session',
  default: '',
});

export const __isLoading = atom({
  key: 'loading',
  default: false,
});

export const getUserLogin = selector({
  key: 'userLogin',
  get: async () => {
    const response = await fetch('http://localhost:8080/apitest/jwt');
    const userData = await response.json();
    return userData;
  },
});

export const StudyBoardList = selector({
  key: 'studyBoardList',
  get: async () => {
    const response = await fetch('http://localhost:8080/content?page=0');
    const data = await response.json();
    return data;
  },
});

// User 정보를 새로고침 해도 유지하기
const { persistAtom } = recoilPersist({
  key: 'userState',
  storage: localStorage,
});

export const UserState = atom<UserStateType>({
  key: 'userState',
  default: {
    email: '',
    exp: 0,
    sub: '',
    profileImg: '',
    username: '',
  },
  effects_UNSTABLE: [persistAtom],
});
