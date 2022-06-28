import React, { useEffect } from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';
import BoardContentBox from '../../components/BoardContentBox';
import { useInfiniteQuery, useQuery } from 'react-query';
import { IDuBoardList } from '../../lib/types';
import Loading from '../../components/Loading';
import NotFound from '../NotFound/NotFound';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const fetchData = async (page: number) => {
  return await axios
    .get(`http://localhost:8080/api/content?page=${page}`)
    .then((res) => res.data);
};
const fetchComment = async (id: string) => {
  return await axios
    .get(`http://localhost:8080/api/comment/${id}`)
    .then((res) => res.data);
};

const StudyBoard = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['page'],
      async ({ pageParam = 0 }) => await fetchData(pageParam),
      { getNextPageParam: (lastPage, pages) => pages.length + 1 }
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
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
                    <BoardContentBox
                      key={data._id}
                      board={data}
                      comment={() => fetchComment(data._id)}
                    />
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
