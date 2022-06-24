import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import ContentLayout from '../../components/ContentLayout';
import Loading from '../../components/Loading/Loading';
import { useQuery } from 'react-query';

const StudyBoardDetail = () => {
  const { id } = useParams();
  const fetchData = async ({ pageParam = id }) => {
    const res = await fetch(`http://localhost:8080/api/content/${pageParam}`);
    return res.json();
  };
  const { isLoading, data } = useQuery('data', fetchData);

  return (
    <ContentLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header data={data} />
          <Body board={data} />
        </>
      )}
    </ContentLayout>
  );
};

export default StudyBoardDetail;
