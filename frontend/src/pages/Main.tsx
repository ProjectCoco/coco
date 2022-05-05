import styled from "styled-components";

const Main = () => {
  return (
    <>
      <Banner>배너이미지</Banner>
      <AbsText>우리들은 가치를 만든다</AbsText>
    </>
  );
};

const Banner = styled.div`
  border: 0.1rem solid black;
  height: 50rem;
  font-size: 5rem;
  text-align: center;
`;
const AbsText = styled.p`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
`;

export default Main;
