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

export type RulesProp = {
  [key: string]: RulesOptionProp;
};

export interface RulesDetailProp {
  message: string;
  value?: any;
}

export interface RulesOptionProp {
  required?: RulesDetailProp;
  email?: RulesDetailProp;
  minLength?: RulesDetailProp;
  maxLength?: RulesDetailProp;
  equal?: RulesDetailProp;
  notEqual?: RulesDetailProp;
  greater?: RulesDetailProp;
  lesser?: RulesDetailProp;
  equalLength?: RulesDetailProp;
  password?: RulesDetailProp;
}

export interface SignupInfo {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  groupInfo?: string;
}
