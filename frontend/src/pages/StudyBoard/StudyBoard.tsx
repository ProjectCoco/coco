import React from 'react';
import * as S from './style';
import ContentLayout from '../../components/ContentLayout';

//dummies
import { DuBoardList } from '../../dummys/dummy';
import BoardContentBox from '../../components/BoardContentBox';

const StudyBoard = () => {
  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {DuBoardList.slice(0, 10).map((data, index) => (
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
