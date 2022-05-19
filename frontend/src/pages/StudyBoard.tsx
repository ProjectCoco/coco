import styled from "styled-components";
import { DuBoardList } from "../dummys/dummy";
import { useNavigate } from "react-router-dom";
// Import Icons
import {
  MdOutlineHome,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardBackspace,
  MdFavorite,
} from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { IoMdPaper } from "react-icons/io";
import commentImg from "../images/userProfile.jpg";
import profileImg2 from "../images/download.jpg";

const StudyBoard = () => {
  const navigator = useNavigate();

  return (
    <BoardDetailContainer>
      <LeftDisplay>
        <Menubar>
          <Home>
            <MdOutlineHome onClick={() => navigator("/")} />
          </Home>
          <Favor>
            <MdOutlineFavoriteBorder />
          </Favor>
          <LinkCommnet href={"#CommentBox"}>
            <AiOutlineComment />
          </LinkCommnet>
          <GoBack>
            <MdOutlineKeyboardBackspace
              onClick={() => navigator("/study-board")}
            />
          </GoBack>
          <Hr>
            <hr />
          </Hr>
          <Write>
            <IoMdPaper />
          </Write>
        </Menubar>
      </LeftDisplay>
      <MainDisplay>
        <Body>
          <Content>
            <BoardListContainer>
              {DuBoardList.slice(0, 10).map((data, index) => (
                <ContentBox onClick={() => navigator(`${data.id}`)} key={index}>
                  <Subject>{data.subject}</Subject>
                  <Content>
                    {data.content.length > 235
                      ? `${data.content.slice(0, 235)}...`
                      : data.content}
                  </Content>
                  <UserLogo>
                    <UserBox>
                      <UserImg src={profileImg2} />
                      <div>
                        <Author>{data.author}</Author>
                        <Date>{data.datetime}</Date>
                      </div>
                    </UserBox>
                    <div style={{ display: "flex" }}>
                      <FavoritBox>
                        <MdFavorite />
                        <h4>{data.favor}</h4>
                      </FavoritBox>
                      <FavoritBox style={{ marginLeft: "2rem" }}>
                        <AiOutlineComment />
                        <h4>{data.comment.length}</h4>
                      </FavoritBox>
                    </div>
                  </UserLogo>
                </ContentBox>
              ))}
            </BoardListContainer>
          </Content>
          <Blank />
        </Body>
      </MainDisplay>
      <RightDisplay>
        <LoginBox>
          <LoginButton>Sign In</LoginButton>
          <SignUpButton>Sign Up</SignUpButton>
        </LoginBox>
        <Search placeholder="검색내용" />
        <MorePosts>
          <h1>Most View</h1>
          {DuBoardList?.slice(1, 5).map((post, idx) => (
            <MorePost key={idx}>
              <MorePostsProfile>
                <MorePostsImg src={commentImg} />
                <h4>ghks042{post.id}</h4>
              </MorePostsProfile>
              <MorePostTitle>
                <div onClick={() => navigator(`/study-board/${post.id}`)}>
                  {post.subject}
                </div>
              </MorePostTitle>
            </MorePost>
          ))}
        </MorePosts>
        <TagBoxTitle>Hot Tags</TagBoxTitle>
        <TagBox>
          <Tag># 알고리즘</Tag>
          <Tag># 자바스크립트</Tag>
          <Tag># 스프링</Tag>
          <Tag># 자바</Tag>
          <Tag># 객체지향</Tag>
          <Tag># 리액트</Tag>
        </TagBox>
      </RightDisplay>
    </BoardDetailContainer>
  );
};
//new
const ContentBox = styled.div`
  border-bottom: 0.1rem solid;
  margin-bottom: 3rem;
  transition: all ease;
  &:hover {
    transform: translateX(-3rem);
  }
`;

const Search = styled.input`
  margin: 0 5rem;
  width: 60%;
  height: 3rem;
  border-radius: 2rem;
  padding-left: 1rem;
`;
const BoardListContainer = styled.div`
  font-size: 2rem;
`;
const BoardDetailContainer = styled.div`
  height: 100vh;
  display: flex;
`;
// Left  DisPlay Start
const LeftDisplay = styled.div`
  border-right: solid 1px lightgray;
  left: 0;
  width: 15%;
  height: 100vh;
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem 0;
`;

const Menubar = styled.div`
  width: 5rem;
  padding: 2rem;
  margin-right: 1rem;
  color: gray;
  font-size: 3rem;
`;

const Home = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    color: black;
    transform: scale(1.1);
  }
`;

const Favor = styled.div`
  padding: 1rem;

  &:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.1);
  }
`;

const LinkCommnet = styled.a`
  padding: 1rem;

  color: gray;
  display: inline-block;
  &:hover {
    color: skyblue;
    transform: scale(1.1);
  }
`;

const GoBack = styled.div`
  padding: 1rem;

  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const Write = styled.div`
  padding: 1rem;

  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const Hr = styled.div`
  padding: 1rem;
`;

//Main display
const Subject = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
  font-family: "Anton", sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 4rem;
  letter-spacing: 0.02 rem;
`;
const UserLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.9rem;

  & > div {
    margin-bottom: 1.8rem;
  }
`;

const UserImg = styled.img`
  margin-top: 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const FavoritBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: skyblue;

  & > h4 {
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
const Author = styled.h4`
  @import url("https://fonts.googleapis.com/css2?family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap");
  margin: 4rem 2rem 0rem;
  font-size: 1.5rem;
  color: black;
  & h4 {
    font-family: "Radio Canada", sans-serif;
    font-family: "Redressed", cursive;
    font-family: "Roboto Flex", sans-serif;
    font-family: "Signika", sans-serif;
  }
`;

const Date = styled.div`
  font-size: 1.3rem;
  margin: 0rem 2rem 0rem;
  color: #888;
`;
const MainDisplay = styled.div`
  width: 100%;
  margin-left: 15%;
  margin-right: 30%;
`;
const Body = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
`;
const Content = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #444;
`;
const Blank = styled.div`
  width: 100%;
  height: 0.1rem;
`;

// Right Display Start
const RightDisplay = styled.div`
  border-left: solid 1px lightgray;
  right: 0;
  width: 30%;
  height: 100vh;
  position: fixed;
`;

const LoginBox = styled.div`
  margin: 5rem;
  display: flex;
  width: 50%;
`;

const LoginButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap");
  font-family: "Playfair Display", serif;
  flex: 6.5;
  width: 30%;
  height: 4rem;
  border-radius: 25rem;
  background-color: #222121;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: none;

  &:hover {
    background-color: black;
  }
`;

const SignUpButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Radio+Canada:wght@600;700&family=Redressed&family=Roboto+Flex:opsz,wght@8..144,300&family=Signika:wght@500&display=swap");
  font-family: "Playfair Display", serif;

  flex: 3.5;
  height: 4rem;
  border: none;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  color: #555;

  &:hover {
    color: black;
  }
`;

const MorePosts = styled.div`
  margin: 10rem 5rem;

  & > h1 {
    font-size: 2rem;
    font-weight: 400;
  }
`;

const MorePost = styled.div`
  padding: 0.5rem 0.2rem;
`;

const MorePostsProfile = styled.div`
  display: flex;
  align-items: center;

  & > h4 {
    padding: 0.7rem;
    font-size: 1.2rem;
  }
`;

const MorePostsImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const MorePostTitle = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
  font-family: "Oswald", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  padding-top: 0.5rem;
  cursor: pointer;
`;

const TagBox = styled.div`
  margin-top: 1rem;
  margin-left: 4rem;
  display: flex;
  flex-wrap: wrap;
  width: 45%;
  border: solid 1px skyblue;
  border-radius: 1rem;
`;

const TagBoxTitle = styled.h1`
  margin-left: 4rem;
  color: skyblue;
  font-size: 2rem;
`;

const Tag = styled.a`
  background-color: skyblue;
  opacity: 0.7;
  color: #fff;
  font-size: 1.4rem;
  margin: 0.6rem;
  border-radius: 0.8rem;
  padding: 0.4rem;
  cursor: pointer;

  &:hover {
    opacity: 2;
  }
`;

export default StudyBoard;
