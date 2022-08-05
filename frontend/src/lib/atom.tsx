import { atom } from 'recoil';
import { IDuBoardList, UserStateType } from './types';
import { recoilPersist } from 'recoil-persist';

export const __Session = atom({
  key: 'session',
  default: '',
});

export const __isLoading = atom({
  key: 'loading',
  default: false,
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

export const FavorBoardList = atom<IDuBoardList[]>({
  key: 'favorList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const LoginTimer = atom({
  key: 'loginTimer',
  default: 1500,
  effects_UNSTABLE: [persistAtom],
});
