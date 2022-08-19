import React, { useEffect } from 'react';
import * as S from './style';
import { IDuBoardList } from '@lib/types';
import { useLocation } from 'react-router-dom';
import { useInfiQry } from '@hooks/useInfiQry';
import { ContentLayout, BoardContentBox, Loading } from '@components/index';

export default function StudyBoard() {
  const pathname = useLocation();
  const { getBoard, refetch, loading, ref } = useInfiQry();

  useEffect(() => {
    refetch();
  }, [pathname.key]);

  if (loading) return <Loading />;
  return (
    <>
      <ContentLayout>
        <S.Body>
          <S.Content>
            <S.BoardListContainer>
              {getBoard?.pages.map((group, index) => (
                <React.Fragment key={index}>
                  {group.content.map((data: IDuBoardList) => (
                    <BoardContentBox key={data._id} board={data} />
                  ))}
                </React.Fragment>
              ))}
            </S.BoardListContainer>
          </S.Content>
          <S.Blank />
          <button ref={ref} />
        </S.Body>
      </ContentLayout>
    </>
  );
}
