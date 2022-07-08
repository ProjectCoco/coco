export interface IDuBoardList {
  _id: string;
  username: string;
  title: string;
  content: string;
  createdDate: string;
  favor: number;
}

export interface IDuComment {
  _id: string;
  comment: string;
  createdDate: string;
  username: string;
}

export interface UserStateType {
  email: string;
  exp: number;
  sub: string;
  profileImg: ProgressEvent<FileReader> | File | Blob | string;
  username: string;
}
