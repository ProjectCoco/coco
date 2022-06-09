import React from 'react';
import styled from 'styled-components';

interface PropsType {
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fontSize?: number;
  children?: string;
  weight?: string;
  onClick?: () => void;
}

function CustomButton(props: PropsType) {
  console.log(props);
  return <Button {...props}>{props.children}</Button>;
}

export default CustomButton;

const Button = styled.button<PropsType>`
  border: none;
  margin: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: ${(props) => (props.weight ? props.weight : '400')};
  width: ${(props) => (props.width ? props.width : '12rem')};
  height: ${(props) => (props.height ? props.height : '6rem')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.5rem')};
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'white')};
  color: ${(props) => (props.color ? props.color : 'black')};

  &:hover {
    transform: scale(0.98);
  }
`;
