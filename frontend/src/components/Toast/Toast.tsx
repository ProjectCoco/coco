import React, { useState } from 'react';
import styled from 'styled-components';
import Toast_Success from '../../images/Toast_succes.png';
import Toast_Fail from '../../images/fail.png';

interface ToastType {
  msg?: string;
  status?: 'success' | 'fail';
}

function Toast(props: ToastType) {
  const [timer, setTimer] = useState(false);

  setTimeout(() => {
    setTimer(true);
  }, 3000);

  function DeleteToast() {
    setTimer(true);
  }

  if (timer) return <div style={{ position: 'absolute' }}></div>;

  return (
    <NoticeContainer {...props}>
      <ToastContainer>
        <ImgBox>
          <img
            src={props.status === 'success' ? Toast_Success : Toast_Fail}
            alt="Toast Message"
          />
        </ImgBox>
        <Title>{props.msg}</Title>
      </ToastContainer>
      <Button onClick={DeleteToast}>x</Button>
    </NoticeContainer>
  );
}

export default Toast;

const NoticeContainer = styled.div<ToastType>`
  background-color: ${(props) =>
    props.status === 'success' ? '#4db04d' : 'red'};
  height: 6rem;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10%;
  transition: transform 10s ease-in-out;
  animation: fadeIn 3s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
const ToastContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImgBox = styled.div`
  padding-left: 1rem;
  padding-bottom: 1rem;
  img {
    height: 3rem;
    width: 3rem;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 2.2rem;
  padding: 0 2rem;
  padding-right: 4rem;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;
