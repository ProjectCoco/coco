import BoardContentBox from '../../components/BoardContentBox';
import ContentLayout from '../../components/ContentLayout';
import { FavorBoardList } from '../../lib/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import * as S from './style';

export default function MyfavorPage() {
  const [list, setList] = useRecoilState(FavorBoardList);

  return (
    <ContentLayout>
      <S.Body>
        <S.Content>
          <S.BoardListContainer>
            {list === []
              ? '좋아요를 눌러주세요'
              : list.map((item) => (
                  <div key={item._id} style={{ position: 'relative' }}>
                    <BoardContentBox board={item} />
                    <S.RemoveBtn
                      onClick={() =>
                        setList(list.filter((x) => item._id !== x._id))
                      }
                    >
                      X
                    </S.RemoveBtn>
                  </div>
                ))}
          </S.BoardListContainer>
        </S.Content>
      </S.Body>
    </ContentLayout>
  );
}
