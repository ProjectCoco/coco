import axios, { AxiosRequestHeaders } from 'axios';
import { SERVER_URL } from './apiEnv';
import { getCookie, setCookie } from '../lib/cookie/cookie';
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
    console.log('리스폰스', response);
    const AccessToken = response.headers.authorization.split(' ')[1];
    const RefreshToken = response.headers['refresh-token'].split(' ')[1];
    console.log(AccessToken, RefreshToken);
    return [AccessToken, RefreshToken];
  } catch (err) {
    throw new Error('인증 실패');
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
export async function checkUsernameApi(username: string) {
  try {
    const response = await apiClient.get(`/api/username/${username}/check`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: POST
// @Route: /username/${email}/check
export async function checkEmailApi(email: string) {
  try {
    const response = await apiClient.get(`/api/email/${email}/check`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: GET
// @Route: /content/${id}
export async function getBoardPage(page: number) {
  try {
    const response = await apiClient.get(`/api/content?page=${page}`, {
      headers,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: GET
// @Route: /content/${id}
export async function getBoardDetail(id?: string) {
  try {
    const response = await apiClient.get(`/api/content/${id}`, { headers });
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: PUT
// @Route: /content/${id}
export async function putBoard(id: string | undefined, data: T.BoardForm) {
  try {
    return await apiClient.put(`/api/content/${id}`, data, { headers });
  } catch (err) {
    return err;
  }
}

// @HTTP: GET
// @Route: /comment/${id}
export async function getCommentAll(id: string) {
  try {
    const response = await apiClient.get(`/api/comment/${id}`, { headers });
    return response.data;
  } catch (err) {
    return err;
  }
}

// @HTTP: PUT
// @Route: /comment/${id}
export async function putComment(id: string, commentForm: T.commentForm) {
  try {
    return await apiClient.put(`/api/comment/${id}`, commentForm, {
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

export const JWT_EXPIRY_TIME = 1500000;

const cookieOptions = {
  path: '/',
};

export async function onRefreshToken() {
  try {
    const response = await apiClient.post('/api/token', null, {
      headers: {
        'Refresh-token': `Bearer ${getCookie('RefreshToken')}`,
      },
    });
    console.log('리프레쉬 토큰 응답', response);
    const AccessToken = response.headers.authorization.split(' ')[1];
    const RefreshToken = response.headers['Refresh-token'].split(' ')[1];
    setCookie('accessToken', AccessToken, cookieOptions);
    setCookie('RefreshToken', RefreshToken, cookieOptions);
    setTimeout(async () => {
      await onRefreshToken();
    }, JWT_EXPIRY_TIME);
  } catch (err) {
    throw new Error('리프레쉬 토큰 발급 실패');
  }
}

export async function onRemoveToken() {
  try {
    console.log('로그아웃 !!');
    const response = await apiClient.post('/api/logout', null, {
      headers: {
        'Refresh-token': `Bearer ${getCookie('RefreshToken')}`,
        'Authorization': `Bearer ${getCookie('accessToken')}`,
      },
    });
    console.log('LogOut', response);
    return response;
  } catch (err) {
    throw new Error('로그아웃');
  }
}
