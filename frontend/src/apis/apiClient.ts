import axios from 'axios';
import { SERVER_URL } from './apiEnv';
// import { getCookie } from '../lib/cookie/cookie';

/* 나중에 인증 부분에 header에 token 넣어서 요청 보내줘야함 (그때 사용 고고 ~)*/
// headers: {
//   "Content-Type": "aplication/json",
//   Authorization : `Bearer ${getCookie('userToken')}`
// }

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

// @HTTP: POST
// @Route: /comment
export async function postCommentApi(commentForm: {
  name: string;
  content: string;
}) {
  try {
    const response = await axios.post('/comment', commentForm);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /login
export async function postLoginApi(LoginForm: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post('/comment', LoginForm);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /signup
export async function postSignupApi(SignupForm: {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  groupInfo: string;
}) {
  try {
    const response = await axios.post('/comment', SignupForm);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /study-board-write
export async function postStudyBoardWriteApi(WriteForm: {
  title: string;
  content: string;
  author: string;
}) {
  try {
    const response = await axios.post('/comment', WriteForm);
    return response.data;
  } catch (err) {
    return err;
  }
}
