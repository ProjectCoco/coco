export interface commentForm {
  author: string;
  comment: string;
  contentId?: string;
  createdDate?: string;
}
export interface LoginForm {
  email: string;
  password: string;
}
export interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  groupInfo: string;
}
export interface WriteForm {
  title: string;
  content: string;
  author: string;
}
export interface BoardForm {
  _id: string;
  author: string;
  title: string;
  content: string;
  createdDate: string;
  favor: number;
}
