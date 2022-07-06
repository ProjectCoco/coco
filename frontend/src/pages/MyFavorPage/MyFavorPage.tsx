import BoardContentBox from '../../components/BoardContentBox';
import ContentLayout from '../../components/ContentLayout';
import { FavorBoardList } from '../../lib/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import * as S from './style';

export default function MyfavorPage() {
  const list = useRecoilValue(FavorBoardList);

  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {list === []
              ? '좋아요를 눌러주세요'
              : list.map((item, index) => (
                  <BoardContentBox key={index} board={item} />
                ))}
          </S.BoardListContainer>
        </S.Content>
      </S.Body>
    </ContentLayout>
  );
}
