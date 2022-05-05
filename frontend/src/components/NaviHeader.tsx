import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const NaviHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/")}>로고</Logo>
        <div>
          <MenuList>
            <MenuListContent
              isPathMatch={pathname === "/free-board" ? true : false}
            >
              자유게시판
            </MenuListContent>
            <MenuListContent
              isPathMatch={pathname === "/study-board" ? true : false}
              onClick={() => navigate("/study-board")}
            >
              스터디구인
            </MenuListContent>
            <MenuListContent
              isPathMatch={pathname === "/login" ? true : false}
              onClick={() => navigate("/login")}
            >
              로그인
            </MenuListContent>
          </MenuList>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 5rem;
  border: 0.1rem solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.button`
  width: 3rem;
  height: 2rem;
  border: 0.1rem solid black;
  margin-left: 1rem;
  background: url("/image/logo.jpg") no-repeat 50% 50%;
  z-index: 3;
`;
const MenuList = styled.ul`
  display: flex;
`;
const MenuListContent = styled.li<{ isPathMatch: boolean }>`
  margin-right: 1rem;
  color: ${(prop) => (prop.isPathMatch ? "blue" : "black")};
`;

export default NaviHeader;
