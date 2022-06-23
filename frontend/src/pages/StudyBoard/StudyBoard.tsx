import React, { useEffect } from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';
import BoardContentBox from '../../components/BoardContentBox';
import { useInfiniteQuery } from 'react-query';
import { IDuBoardList } from '../../lib/types';
import Loading from '../../components/Loading';
import NotFound from '../NotFound/NotFound';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const fetchData = async (page: number) => {
  return await axios
    .get(`http://localhost:8080/content?page=${page}`)
    .then((res) => res.data);
};

const StudyBoard = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['page'],
    async ({ pageParam = 0 }) => await fetchData(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage);
        return pages.length + 1 ?? undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
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
                  {group.map((data: IDuBoardList) => (
                    <BoardContentBox key={data._id} board={data} />
                  ))}
                </React.Fragment>
              ))}
            </S.BoardListContainer>
          </S.Content>
          <S.Blank />
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          />
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </S.Body>
      </ContentLayout>
    </>
  );
};

export default StudyBoard;
