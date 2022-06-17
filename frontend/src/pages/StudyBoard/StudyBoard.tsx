import React, { useEffect, useState } from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';
import BoardContentBox from '../../components/BoardContentBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StudyBoardList, __isLoading } from '../../lib/atom';

const StudyBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const getBoard = useRecoilValue(StudyBoardList);
  const [isLoading, setIsLoading] = useRecoilState(__isLoading);

  useEffect(() => {
    setIsLoading(true);
    setBoardList(getBoard);
    if (boardList !== null) setIsLoading(false);
  }, [boardList, getBoard, setIsLoading]);

  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {boardList.map((data, index) => (
              <BoardContentBox key={index} data={data} />
            ))}
          </S.BoardListContainer>
        </S.Content>
        <S.Blank />
      </S.Body>
    </ContentLayout>
  );
};

export default StudyBoard;
