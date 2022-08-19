import ContentLayout from '@components/ContentLayout';
import Loading from '@components/Loading';
import { useInfiQry } from '@hooks/useInfiQry';
import { IDuBoardList } from '@lib/types';
import * as S from './style';
import React from 'react';
import BoardContentBox from '@components/BoardContentBox';

export default function MyCommentPage() {
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
                  data.commentState ? (
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
