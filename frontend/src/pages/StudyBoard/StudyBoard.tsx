import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import * as S from './style';
import { IDuBoardList } from '@lib/types';
import { useLocation } from 'react-router-dom';
import { useInfiQry } from '@hooks/useInfiQry';
import { ContentLayout, BoardContentBox, Loading } from '@components/index';

export default function StudyBoard() {
  const pathname = useLocation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { getBoard, nextPage, hasNext, setPage, page, refetch, loading } =
    useInfiQry();

  useEffect(() => {
    if (inView && hasNext) nextPage().then(() => setPage(page + 1));
  }, [inView]);

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
