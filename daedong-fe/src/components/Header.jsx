import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import daytLogo from "../images/dayt_logo.png";
import peopleLogo2 from "../images/peopleLogo2.png";
import toggleButton from "../images/ToggleButton.png";
import arrowButton from "../images/Arrow.png";
import peopleButton from "../images/mypage.svg";
import settingButton from "../images/option.svg";
import logoutButton from "../images/logoutbutton.svg";

export const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <HeaderContainer>
        <Logo>
          <img src={daytLogo} alt="Add" />
        </Logo>
        <NavField>
          <Nav>
            <Link to="/">MAIN</Link>
            <Link to="/workspace/main">WORKSPACE</Link>
            <Link to="/todoList">DAILY</Link>
          </Nav>
        </NavField>
        <LogoImg>
          <p>User</p>
          <p>님</p>
          <img src={peopleLogo2} alt="User" width={20} />
          <img
            src={toggleButton}
            alt="Toggle Sidebar"
            onClick={toggleSidebar}
          />
        </LogoImg>
      </HeaderContainer>

      <SidebarContainer isVisible={isSidebarVisible}>
        <Title>
          <TitleImage src={arrowButton} width="13px" height="13px" />
          <TitleText>DaedongKing</TitleText>
          <TitleText>님</TitleText>
        </Title>
        <ImgContainer>
          <Button type="reset">내 계정</Button>
          <StyledImage src={peopleButton} alt="My Page" />
          <Link to="/accountSetting">
            <StyledImage src={settingButton} alt="Settings" />
          </Link>
          <StyledImage src={logoutButton} alt="Logout" />
        </ImgContainer>
      </SidebarContainer>

      <MainContent>{/* 여기에 라우트와 다른 컨텐츠를 배치 */}</MainContent>
    </>
  );
};

const HeaderContainer = styled.header`
  background-color: #ffffff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.295);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-right: 55px;
  img {
    width: 40px;
    height: 40px;
    perspective: 100px;
  }
  &:hover {
    transform: translateX(20px);
    transform: rotateY(360deg);
    cursor: pointer;
  }
  transition: 1s all;
`;

const NavField = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 80%;
  height: 70px;
  padding-right: 120px;
  font-size: 13px;
`;

const Nav = styled.div`
  height: 70px;
  display: flex;
  gap: 55px;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  padding: 0;

  a {
    color: black;
    text-decoration: none;
    font-family: Pretendard-Regular;
    font-weight: 700;
    transition: transform 0.3s ease;
  }

  a:hover {
    transform: scale(1.2);
  }
`;

const LogoImg = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 15px;
    margin: 0;
    padding: 0 5px;
    &:nth-child(2) {
      padding-left: 5px;
    }
  }
  img {
    margin-left: 20px;
    margin-right: 25px;
    cursor: pointer;
  }
  &:last-child {
    margin-right: 30px;
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 50px;
  right: ${({ isVisible }) => (isVisible ? "0" : "-15vw")};
  width: 15vw;
  height: calc(100vh - 50px);
  background-color: #ffffff;
  border-left: 1px solid rgba(0, 0, 0, 0.295);
  transition: right 0.3s ease-in-out;
  z-index: 999;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
`;

const TitleImage = styled.img`
  margin-right: 10px;
  height: 20px;
  width: 20px;
`;

const TitleText = styled.p`
  font-size: 13px;
  margin: 0;
  font-weight: 700;
`;

const Button = styled.button`
  background-color: #fff16d;
  border: none;
  padding: 8px 35px;
  cursor: pointer;
  font-family: "Pretendard-Regular";
  font-weight: 700;
  border-radius: 15px;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 10px;
  margin-right: 95px;
  width: 130px;
  text-align: center;
`;

const ImgContainer = styled.div`
  margin-left: 20px;
`;

const StyledImage = styled.img`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
`;

const MainContent = styled.div`
  margin-top: 50px;
  padding: 20px;
`;
