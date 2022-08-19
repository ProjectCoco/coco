import { getBoardPage } from '@apis/apiClient';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

export const useInfiQry = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const {
    data: getBoard,
    fetchNextPage: nextPage,
    hasNextPage: hasNext,
    refetch,
    isLoading: loading,
  } = useInfiniteQuery(
    ['page'],
    async ({ pageParam = 0 }) => await getBoardPage(String(pageParam)),
    {
      getNextPageParam: (lastPage, pages) =>
        !lastPage.isLast && lastPage.pageNumber + 1,
    }
  );

  useEffect(() => {
    if (inView && hasNext) nextPage();
  }, [inView]);

  return {
    getBoard,
    refetch,
    loading,
    ref,
  };
};
