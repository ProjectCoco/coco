import React, { useEffect, useState } from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';
import BoardContentBox from '../../components/BoardContentBox';
import { useInfiniteQuery } from 'react-query';
import { IDuBoardList } from '../../lib/types';
import Loading from '../../components/Loading';
import NotFound from '../NotFound/NotFound';
import { useInView } from 'react-intersection-observer';
import { getBoardPage } from '../../apis/apiClient';
import { useLocation } from 'react-router-dom';

const StudyBoard = () => {
  const pathname = useLocation();
  const [num, SetNum] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const { isLoading, isError, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(
      ['page', pathname],
      async ({ pageParam = 0 }) => await getBoardPage(pageParam),
      { getNextPageParam: () => num }
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage().then(() => SetNum(num + 1));
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [pathname.key]);

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
                  {group.map((data: IDuBoardList) => (
                    <BoardContentBox key={data._id} board={data} />
                  ))}
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
