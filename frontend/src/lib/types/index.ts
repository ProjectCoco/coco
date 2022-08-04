export interface IDuBoardList {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdDate: string;
  favorCount: number | null;
  commentCount: number | null;
  favorState: boolean;
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
