import React from 'react';
import styled from 'styled-components';
import LeftMenubar from './LeftMenubar';
import RightMenubar from './RightMenubar';

interface Prop {
  children?: React.ReactNode;
}

const ContentLayout = ({ children }: Prop) => {
  return (
    <Container>
      <LeftDisplay>
        <LeftMenubar />
      </LeftDisplay>
      <MainDisplay>{children}</MainDisplay>
      <RightDisplay>
        <RightMenubar />
      </RightDisplay>
    </Container>
  );
};

export default ContentLayout;

const Container = styled.div`
  height: 100%;
  display: flex;
`;
const LeftDisplay = styled.div`
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
const MainDisplay = styled.div`
  width: 100%;
  margin-left: 15%;
  margin-right: 30%;
`;
const RightDisplay = styled.div`
  border-left: solid 1px lightgray;
  right: 0;
  width: 30%;
  height: 100%;
  position: fixed;
`;
