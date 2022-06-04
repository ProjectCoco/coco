import React, { useEffect } from 'react';
import * as S from './style';
import isValid from '../lib/isValid';

interface Prop extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  inputName: string;
  inputType?: string;
  inputValue: string;
  atComplete?: string;
  textChange: (text: string) => void;
  process?: boolean;
}

const InputComp = (props: Prop) => {
  const validText = isValid(props.inputValue, props.inputName);

  useEffect(() => {
    validText;
  }, [props.textChange, validText]);

  return (
    <S.InputBox>
      <label>{props.inputLabel}</label>
      <S.Input
        {...props}
        name={props.inputName}
        type={props.inputType}
        value={props.inputValue}
        autoComplete={props.atComplete}
        onChange={(e) => {
          props.textChange(e.target.value);
        }}
      />
      <S.ErrorText>{validText}</S.ErrorText>
    </S.InputBox>
  );
};

export default InputComp;
