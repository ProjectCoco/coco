import styled from 'styled-components';

interface Prop {
  subject: string;
  content: string;
  onClick: () => void;
}

const FavorCard = ({ subject, content, onClick }: Prop) => {
  return (
    <>
      <Card onClick={onClick}>
        <Subject>{subject}</Subject>
        <Content>{content}</Content>
      </Card>
    </>
  );
};

export default FavorCard;

const Card = styled.div`
  width: 20%;
  height: 10rem;
  border: 0.1rem solid black;
`;
const Subject = styled.div``;
const Content = styled.div``;
