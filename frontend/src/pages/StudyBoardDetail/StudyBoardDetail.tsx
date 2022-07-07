import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import ContentLayout from '../../components/ContentLayout';
import Loading from '../../components/Loading/Loading';
import { useQueries } from 'react-query';
import { getBoardDetail, getCommentAll } from '../../apis/apiClient';

const StudyBoardDetail = () => {
  const { id } = useParams();
  const allQuery = useQueries([
    {
      queryKey: ['data', id],
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
      <Header board={allQuery[0].data} />
      <Body board={allQuery[0].data} comment={allQuery[1].data} />
    </ContentLayout>
  );
};

export default StudyBoardDetail;
