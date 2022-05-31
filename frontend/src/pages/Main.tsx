import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Banner1 from '../images/BannerImage.png';
import Typewriter from 'typewriter-effect';

const Main = () => {
  const navigator = useNavigate();
  const [subTitleTimer, setSubTitleTimer] = useState<boolean>(false);
  return (
    <>
      <Banner>
        <TextBox>
          <BannerTitle>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(90)
                  .typeString('CodeStates 39th Community')
                  // .pauseFor(10)
                  .start()
                  // .pauseFor(100)
                  .callFunction(function (state) {
                    state.elements.cursor.style.display = 'none';
                    setSubTitleTimer(true);
                  });
              }}
            />
          </BannerTitle>
          {subTitleTimer ? (
            <BannerSubTitle>
              코드스테이츠 39기 프론트엔드 , 백엔드 통합 온라인 커뮤니티 사이트
              입니다.{' '}
            </BannerSubTitle>
          ) : (
            <div style={{ height: '3rem' }} />
          )}

          <ButtonBox>
            <Button onClick={() => navigator('/')}>자유게시판</Button>
            <Button onClick={() => navigator('/study-board')}>
              스터디게시판
            </Button>
          </ButtonBox>
        </TextBox>
        <ImgBox>
          <BannerImg src={Banner1}></BannerImg>
        </ImgBox>
      </Banner>
    </>
  );
};

const Banner = styled.div`
  height: 100vh;
  font-size: 5rem;
  text-align: center;
  background-color: #d8e6ed;

  display: flex;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    & {
      flex-direction: column;
    }
  }
`;

const TextBox = styled.div`
  width: 90rem;
  margin-bottom: 10rem;
`;

const ImgBox = styled.div``;

const BannerImg = styled.img`
  width: 37rem;
`;

const ButtonBox = styled.div`
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: white;
  color: #444;
  width: 12rem;
  height: 6rem;
  border: none;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    transform: scale(0.98);
  }
`;

const BannerTitle = styled.h2`
  caret-color: rgba(0, 0, 0, 0);

  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap');
  font-family: 'Roboto', sans-serif;

  color: #444;
  font-weight: bold;
  font-size: 6rem;
`;

const BannerSubTitle = styled.h3`
  font-size: 2.5rem;
  color: #555;
  width: 90rem;
  height: 3rem;
  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export default Main;
