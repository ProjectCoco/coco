import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import ContentLayout from '../../components/ContentLayout';
import Loading from '../../components/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchData = async (pageParam: string) => {
  return axios
    .get(`http://localhost:8080/api/content/${pageParam}`)
    .then((res) => res.data);
};
const fetchComment = async (id: string) => {
  return axios
    .get(`http://localhost:8080/api/comment/${id}`)
    .then((res) => res.data);
};

const StudyBoardDetail = () => {
  const { id } = useParams();
  const { isLoading: boardLoading, data: board } = useQuery(
    ['data', id],
    async () => await fetchData(String(id))
  );
  const { isLoading: commentLoading, data: comment } = useQuery(
    ['comment', id],
    async () => await fetchComment(String(id))
  );

  if (boardLoading || commentLoading) return <Loading />;
  return (
    <ContentLayout>
      <Header board={board} />
      <Body board={board} comment={comment} />
    </ContentLayout>
  );
};

export default StudyBoardDetail;
