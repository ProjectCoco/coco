export interface IDuBoardList {
  id: number;
  subject: string;
  content: string;
  datetime: string;
  favor: number;
  comment: IDuComment[];
}
export interface IDuComment {
  id: number;
  content: {
    id: number;
    content: string;
  }[];
}

const DuComment = [
  {
    id: 1,
    content: [
      {
        id: 1,
        content: "정말 좋은 이야기네요.",
      },
      {
        id: 2,
        content: "오늘도 좋은 하루 보내시길",
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        id: 1,
        content: "꽃이 정말 예뻐요",
      },
      {
        id: 2,
        content: "나랏말싸미",
      },
    ],
  },
];
export const DuBoardList = [
  {
    id: 1,
    subject: "오늘도 즐겁게",
    content: "즐겁게 하루를 시작해보자",
    datetime: "2022-05-05",
    favor: 30,
    comment: DuComment,
    author: "홍길동",
  },
  {
    id: 2,
    subject: "오늘도 우울하게",
    content: "우울하게 하루를 시작해보자",
    datetime: "2022-05-04",
    favor: 30,
    comment: DuComment,
    author: "이순신",
  },
  {
    id: 3,
    subject: "오늘도 우울하게 재밌게",
    content: "우울하게 하루를 시작시작해보자",
    datetime: "2022-05-02",
    favor: 30,
    comment: DuComment,
    author: "세종대왕",
  },
  {
    id: 4,
    subject: "오늘도 재미지게하게",
    content: "우울하게 하루를 재미시작해보자",
    datetime: "2022-05-01",
    favor: 30,
    comment: DuComment,
    author: "최무선",
  },
];
