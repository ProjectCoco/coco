import { atom, selector } from 'recoil';

export const __Session = atom({
  key: 'session',
  default: '',
});

export const getUserLogin = selector({
  key: 'userLogin',
  get: async () => {
    const response = await fetch('http://localhost:8080/apitest/jwt');
    const userData = await response.json();
    return userData;
  },
});

export const StudyBoardState = atom({
  key: 'studyBoardState',
  default: [],
});
