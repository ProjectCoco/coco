import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import { DuBoardList, IDuBoardList } from '../../dummys/dummy';
import ContentLayout from '../../components/ContentLayout';
import Loading from '../../components/Loading/Loading';

const StudyBoardDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<IDuBoardList>();

  useEffect(() => {
    DuBoardList.find((board) =>
      board.id === Number(id) ? setData(board) : null
    );
  }, [id]);

  return (
    <ContentLayout>
      {data ? (
        <>
          <Header data={data} /> <Body data={data} />
        </>
      ) : (
        <Loading />
      )}
    </ContentLayout>
  );
};

export default StudyBoardDetail;
