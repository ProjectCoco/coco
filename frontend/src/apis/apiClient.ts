import axios, { AxiosRequestHeaders } from 'axios';
import { SERVER_URL } from './apiEnv';
import { getCookie } from '../lib/cookie/cookie';
import * as T from './types';

export const apiClient = axios.create({
  baseURL: SERVER_URL,
});

const headers: AxiosRequestHeaders = {
  Authorization: `Bearer ${getCookie('accessToken')}`,
};

// @HTTP: POST
// @Route: /comment
export async function postCommentApi(commentForm: T.commentForm) {
  try {
    return await apiClient.post('/api/comment', commentForm, {
      headers,
    });
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /login
export async function postLoginApi(LoginForm: T.LoginForm) {
  try {
    const response = await apiClient.post('/api/login', LoginForm);
    console.log(response);
    return response.headers.authorization.split(' ')[1];
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /signup
export async function postSignupApi(SignupForm: T.SignupForm) {
  try {
    const response = await apiClient.post('/api/signup', SignupForm);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /study-board-write
export async function postBoardWriteApi(WriteForm: T.WriteForm) {
  try {
    const response = await apiClient.post('/api/content', WriteForm, {
      headers,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /username/${username}/check
// export async function checkUsernameApi(username: string) {
//   try {
//     const response = await apiClient.get(`/api/username/${username}/check`);
//     return response;
//   } catch (err) {
//     return err;
//   }
// }

// @HTTP: POST
// @Route: /username/${email}/check
// export async function checkEmailApi(email: string) {
//   try {
//     const response = await apiClient.get(`/api/email/${email}/check`);
//     return response;
//   } catch (err) {
//     return err;
//   }
// }

// @HTTP: GET
// @Route: /content/${id}
export async function getBoardPage(page: number) {
  try {
    const response = await apiClient.get(`/api/content?page=${page}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: PUT
// @Route: /content/${id}
export async function putBoard(id: string, data: T.BoardForm) {
  try {
    return await apiClient.put(`/api/content/${id}`), data, { headers };
  } catch (err) {
    return err;
  }
}

// @HTTP: GET
// @Route: /comment/${id}
export async function getCommentAll(id: string) {
  try {
    const response = await apiClient.get(`/api/comment/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: PUT
// @Route: /comment/${id}
export async function putComment(id: string, data: string) {
  try {
    return await apiClient.put(`/api/comment/${id}`, data, {
      headers,
    });
  } catch (err) {
    return err;
  }
}

// @HTTP: DELETE
// @Route: /comment/${id}
export async function removeComment(id: string) {
  try {
    return await apiClient.delete(`/api/comment/${id}`, {
      headers,
    });
  } catch (err) {
    return err;
  }
}
