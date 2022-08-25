import React from 'react';
import * as S from './style';
import { useInfiQry } from '@hooks/useInfiQry';
import { IDuBoardList } from '@lib/types';
import { Loading, BoardContentBox, ContentLayout } from '@components/index';
import { useSearchParams } from 'react-router-dom';

export default function TagSearchPage() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const { getBoard, loading, ref } = useInfiQry();

  if (!tag || loading) return <Loading />;
  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {getBoard?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.content
                  .filter((data: IDuBoardList) => data.tag.includes(tag))
                  .map((data: IDuBoardList) => (
                    <BoardContentBox key={data._id} board={data} />
                  ))}
              </React.Fragment>
            ))}
          </S.BoardListContainer>
        </S.Content>
        <button ref={ref} />
      </S.Body>
    </ContentLayout>
  );
}
