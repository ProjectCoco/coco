import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
`;
export const LeftDisplay = styled.div`
  border-right: solid 1px lightgray;
  left: 0;
  width: 15%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem 0;
`;
export const MainDisplay = styled.div`
  width: 100%;
  margin-left: 15%;
  margin-right: 30%;
`;
export const RightDisplay = styled.div`
  border-left: solid 1px lightgray;
  right: 0;
  width: 30%;
  height: 100%;
  position: fixed;
`;
