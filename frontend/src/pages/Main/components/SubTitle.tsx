import React from 'react';
import * as S from '../style';
interface PropsType {
  subTitleTimer: boolean;
}

function SubTitle({ subTitleTimer }: PropsType) {
  return (
    <>
      {subTitleTimer ? (
        <S.BannerSubTitle>
          코드스테이츠 39기 프론트엔드 , 백엔드 통합 온라인 커뮤니티 사이트
          입니다.{' '}
        </S.BannerSubTitle>
      ) : (
        <div style={{ height: '3rem' }} />
      )}
    </>
  );
}

export default SubTitle;
