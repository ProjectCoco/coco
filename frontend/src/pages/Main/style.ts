import styled from 'styled-components';

export const Banner = styled.div`
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

export const TextBox = styled.div`
  width: 90rem;
  margin-bottom: 10rem;
`;

export const ImgBox = styled.div``;

export const BannerImg = styled.img`
  width: 37rem;
`;

export const ButtonBox = styled.div`
  margin-top: 2rem;
`;

export const BannerTitle = styled.h2`
  caret-color: rgba(0, 0, 0, 0);

  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap');
  font-family: 'Roboto', sans-serif;

  color: #444;
  font-weight: bold;
  font-size: 6rem;
`;

export const BannerSubTitle = styled.h3`
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
