import axios from 'axios';
import { SERVER_URL } from './apiEnv';

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
