import React from 'react';
import * as S from './style';
import LeftMenubar from './Left';
import RightMenubar from './Right';

interface Prop {
  children?: React.ReactNode;
}

const ContentLayout = ({ children }: Prop) => {
  return (
    <S.Container>
      <S.LeftDisplay>
        <LeftMenubar />
      </S.LeftDisplay>
      <S.MainDisplay>{children}</S.MainDisplay>
      <S.RightDisplay>
        <RightMenubar />
      </S.RightDisplay>
    </S.Container>
  );
};

export default ContentLayout;
