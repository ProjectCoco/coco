import React from 'react';
import styled from 'styled-components';

interface Prop extends React.InputHTMLAttributes<HTMLInputElement> {
  onTextChange: (text: string) => void;
  validate?: 'succ' | 'normal' | 'fail';
  label?: string;
}

const InvalidInput = (prop: Prop) => {
  function checkValidate() {
    if (prop.validate == 'succ') return '';
    else if (prop.validate == 'fail') return '';
    else return '';
  }
  function colorValidate() {
    if (prop.validate == 'succ') return '';
    else if (prop.validate == 'fail') return '';
    else return '';
  }

  return (
    <>
      <Input {...prop} onChange={(e) => prop.onTextChange(e.target.value)} />
    </>
  );
};

export default InvalidInput;

const Input = styled.input``;
