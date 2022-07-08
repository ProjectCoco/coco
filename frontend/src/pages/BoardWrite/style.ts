import styled from 'styled-components';

export const BoardWirteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const TitleInput = styled.input`
  width: 814px;
  padding: 1.3rem 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid #dcdfe7;
  border-radius: 0.3rem;
`;

export const TagContainer = styled.div`
  width: 838px;
  padding: 1.3rem 1.3rem 0.3rem 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #dcdfe7;
  border-radius: 0.3rem;
  display: flex;
  > input {
    flex-grow: 1;
    border: none;
    margin-bottom: 1rem;
  }
  > ul {
    display: flex;
    font-size: 1rem;
    flex-wrap: wrap;

    > li {
      margin-right: 1rem;
      border: none;
      background-color: #ffbd4b;
      padding: 0.3rem;
      border-radius: 0.5rem;
      color: #555;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      &:hover {
        transform: scale(0.98);
      }
      > span {
        height: 1.2rem;
        display: flex;
        align-items: center;
      }
      > button {
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        margin: 0;
        padding: 0;
        margin-left: 0.3rem;
        color: #555;
        width: 1.2rem;
        height: 1.2rem;
        text-align: center;
      }
    }
  }
`;

export const WriteButton = styled.button`
  margin-top: 3rem;
  background-color: #5de0e6;
  color: #fff;
  font-weight: 600;
  height: 4rem;
  width: 20%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;
