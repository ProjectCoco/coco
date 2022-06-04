import styled from 'styled-components';
import selectArrow from '../../images/selectArrow.png';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SignUpContainer = styled.div`
  border: 1px solid lightgray;
  padding: 6rem 4rem 8rem 4rem;
  margin-top: 6rem;
  border-radius: 1rem;
`;
export const SignUpTextBox = styled.div`
  text-align: center;
  & > h1 {
    font-size: 4rem;
    color: #5de0e6;
    font-weight: 500;
  }
  & > p {
    font-size: 1.5rem;
    color: #5de0e6;
  }
`;
export const SignUpForm = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 35rem;
`;
export const GroupInfoInput = styled.select`
  border: none;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
  background: url(${selectArrow}) no-repeat 97% 50%/1.5rem auto;
  background-color: #ececec;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
export const GroupInfoInputBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;
export const SignUpButton = styled.button`
  margin-top: 4rem;
  background-color: #5de0e6;
  color: #fff;
  font-weight: 600;
  height: 4rem;
  width: 50%;
  margin-left: 25%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;
