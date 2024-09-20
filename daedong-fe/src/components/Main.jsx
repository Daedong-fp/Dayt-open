import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';

import MainpageImg_2 from '../assest/mainPage_img2.png';
import MainpageImg_1 from '../assest/mainPage_img.png';
import Ex_TodoImg from '../assest/ex_todo.png'
import Ex_KanbanImg from '../assest/Ex_Kanban.png'

// Global styles
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'), url(./woff2/Pretendard-SemiBold.woff2)
    format('woff2'), url(./woff/Pretendard-SemiBold.woff) format('woff');
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard';
    font-weight: 500;
    color: #333;
    text-align: center;
    -ms-overflow-style: none;
    background: linear-gradient(to bottom, #fff, #fff27be0);
    background-attachment: fixed;
    background-size: cover;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  padding-top: 80px;
  min-height: 100%;
  padding-bottom: 100px;
`;

const CTA = styled.div`
  margin: 80px 0;

  img {
    margin: 10px;
    margin-bottom: 90px;
  }

  button {
    width: 300px;
    height: 55px;
    padding: 10px 0px 10px 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 25px;
    font-size: 30px;
    cursor: pointer;
    margin-bottom: 500px;
    display: flex;
    justify-content: center;
    margin: auto;
    align-items: center;
    font-family: 'Pretendard';
    font-weight: bold;
  }

  .Start-Button {
    transition: 0.5s all;
  }

  .Start-Button:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Section = styled.div`
  margin-top: 300px;

  img {
    position: relative;
    top: 220px;
  }
`;

const Features = styled.div`
  position: relative;
  margin-top: 100px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Feature = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 230px;
  height: 55px;
  font-size: 23px;
  font-family: 'Pretendard';
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  position: absolute;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const FeatureCenter = styled(Feature)`
  top: -30%;
`;

const FeatureTopLeft = styled(Feature)`
  top: -10%;
  left: 20%;
`;

const FeatureTopRight = styled(Feature)`
  top: -10%;
  right: 18%;
`;

const FeatureBottomLeft = styled(Feature)`
  bottom: 35%;
  left: 18%;
`;

const FeatureBottomRight = styled(Feature)`
  bottom: 35%;
  right: 20%;
`;

const FeatureBottomCenter = styled(Feature)`
  bottom: 20%;
`;

const Kanban = styled.div`
  display: flex;
  justify-content: center;
`;

const KanbanImg = styled.img`
  margin-bottom: 200px;
  margin-top: 800px;
`;

const Footer = styled.div`
  width: 100px;
`;

const FadeIn = styled.div`
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  padding: 0;
  text-decoration-line: none;
`;

// Main component
const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        element.classList.toggle('visible', isVisible);
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <FadeIn className="fade-in">
          <CTA>
            <img src={MainpageImg_2} width={700} alt='' />
            <StyledLink to="/todo">
              <button className='Start-Button'>시작하기 ➔</button>
            </StyledLink>
          </CTA>
        </FadeIn>
        <FadeIn className="fade-in">
          <Section>
            <img src={MainpageImg_1} width={650} alt='' />
            <Features>
              <FeatureTopLeft>역할 분담</FeatureTopLeft>
              <FeatureTopRight>칸반 보드</FeatureTopRight>
              <FeatureBottomLeft>게시판</FeatureBottomLeft>
              <FeatureBottomRight>개인 일정 관리</FeatureBottomRight>
              <FeatureBottomCenter>개인 캘린더</FeatureBottomCenter>
              <FeatureCenter>프로젝트 소개</FeatureCenter>
            </Features>
          </Section>
        </FadeIn>
        <FadeIn className="fade-in">
          <Section>
            <img src={Ex_TodoImg} alt='todoimg' width={650} height={450} />
          </Section>
        </FadeIn>
        <FadeIn className="fade-in">
          <section>
            <Kanban>
              <KanbanImg src={Ex_KanbanImg} alt='kanbanimg' width={900} height={470} />
            </Kanban>
          </section>
        </FadeIn>
      </Container>
      <Footer />
    </>
  );
};

export default App;