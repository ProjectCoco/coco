import React from 'react';
import * as S from './style';
import { useInfiQry } from '@hooks/useInfiQry';
import { IDuBoardList } from '@lib/types';
import { Loading, BoardContentBox, ContentLayout } from '@components/index';

export default function MyfavorPage() {
  const { getBoard, loading, ref } = useInfiQry();

  if (loading) return <Loading />;
  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {getBoard?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.content.map((data: IDuBoardList) =>
                  data.favorState ? (
                    <BoardContentBox key={data._id} board={data} />
                  ) : null
                )}
              </React.Fragment>
            ))}
          </S.BoardListContainer>
        </S.Content>
        <button ref={ref} />
      </S.Body>
    </ContentLayout>
  );
}
