export interface IDuBoardList {
  _id: string;
  author: string;
  title: string;
  content: string;
  createdDate: string;
  favor: number;
}

export interface IDuComment {
  _id: string;
  comment: string;
  createdDate: string;
  author: string;
}

export interface UserStateType {
  email: string;
  exp: number;
  sub: string;
  profileImg: ProgressEvent<FileReader> | File | Blob | string;
  username: string;
}
