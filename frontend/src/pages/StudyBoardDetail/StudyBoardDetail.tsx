import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueries } from 'react-query';
import { Header, Body } from './components';
import { ContentLayout, Loading } from '@components/index';
import { getBoardDetail, getCommentAll } from '@apis/apiClient';

const StudyBoardDetail = () => {
  const { id } = useParams();
  const allQuery = useQueries([
    {
      queryKey: ['board', id],
      queryFn: async () => await getBoardDetail(String(id)),
    },
    {
      queryKey: ['comment', id],
      queryFn: async () => await getCommentAll(String(id)),
    },
  ]);
  const loading = allQuery.some((result) => result.isLoading);

  if (loading) return <Loading />;
  return (
    <ContentLayout>
      <Header
        board={allQuery[0].data}
        comment={allQuery[1].data}
        refetch={allQuery[0].refetch}
      />
      <Body
        board={allQuery[0].data}
        comment={allQuery[1].data}
        refetch={allQuery[1].refetch}
      />
    </ContentLayout>
  );
};

export default StudyBoardDetail;
