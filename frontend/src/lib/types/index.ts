export interface IDuBoardList {
  id: number;
  subject: string;
  content: string;
  datetime: string;
  favor: number;
  comment: IDuComment[];
  author: string;
}

export interface IDuComment {
  id: number;
  content: {
    id: number;
    content: string;
  }[];
}
