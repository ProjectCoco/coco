import React, { useEffect } from 'react';
import * as S from './style';
import { useInView } from 'react-intersection-observer';
import { useInfiQry } from '@hooks/useInfiQry';
import { IDuBoardList } from '@lib/types';
import { Loading, BoardContentBox, ContentLayout } from '@components/index';

export default function MyfavorPage() {
  const { getBoard, nextPage, hasNext, setPage, page, loading } = useInfiQry();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNext) nextPage().then(() => setPage(page + 1));
  }, [inView]);

  if (loading) return <Loading />;
  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {getBoard?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.map((data: IDuBoardList) =>
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
