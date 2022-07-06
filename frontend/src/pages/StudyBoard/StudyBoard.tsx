import React, { useEffect, useState } from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';
import BoardContentBox from '../../components/BoardContentBox';
import { useInfiniteQuery } from 'react-query';
import { IDuBoardList } from '../../lib/types';
import Loading from '../../components/Loading';
import NotFound from '../NotFound/NotFound';
import { useInView } from 'react-intersection-observer';
import { getBoardPage, getCommentAll } from '../../apis/apiClient';

const StudyBoard = () => {
  const [num, SetNum] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['page'],
      async ({ pageParam = 0 }) => await getBoardPage(pageParam),
      { getNextPageParam: () => num }
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
      SetNum(num + 1);
    }
  }, [inView]);

  if (isLoading) return <Loading />;
  if (isError) return <NotFound />;
  return (
    <>
      <ContentLayout>
        <S.Body>
          <S.Content>
            <S.BoardListContainer>
              {data?.pages.map((group, index) => (
                <React.Fragment key={index}>
                  {group.map((data: IDuBoardList) => {
                    const get = async () => await getCommentAll(data._id);
                    return (
                      <BoardContentBox
                        key={data._id}
                        board={data}
                        comment={get.length}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </S.BoardListContainer>
          </S.Content>
          <S.Blank />
          <button ref={ref} onClick={() => fetchNextPage()} />
        </S.Body>
      </ContentLayout>
    </>
  );
};

export default StudyBoard;
