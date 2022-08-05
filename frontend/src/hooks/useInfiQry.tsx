import { getBoardPage } from '@apis/apiClient';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

export const useInfiQry = () => {
  const [page, setPage] = useState(1);

  const {
    data: getBoard,
    fetchNextPage: nextPage,
    isSuccess: getBoardIsSuccess,
    hasNextPage: hasNext,
    refetch,
    isLoading: loading,
  } = useInfiniteQuery(
    ['page'],
    async ({ pageParam = 0 }) => await getBoardPage(pageParam),
    { getNextPageParam: () => page }
  );

  return {
    getBoard,
    nextPage,
    getBoardIsSuccess,
    hasNext,
    setPage,
    page,
    refetch,
    loading,
  };
};
