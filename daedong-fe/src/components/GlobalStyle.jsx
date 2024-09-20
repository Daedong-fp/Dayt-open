import styled, { createGlobalStyle } from "styled-components";
import { useInView } from "react-intersection-observer";

export const FadeInComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <FadeInSection ref={ref} isVisible={inView}>
      {children}
    </FadeInSection>
  );
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'), url(./woff2/Pretendard-SemiBold.woff2) format('woff2'), url(./woff/Pretendard-SemiBold.woff) format('woff');
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    font-family: 'Pretendard', sans-serif;
    font-weight: 500;
    color: #333;
    text-align: center;
    background: linear-gradient(to bottom, #fff, #fff27be0);
    background-attachment: fixed;
    background-size: cover;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Container = styled.div`
  min-height: 100%;
  padding-bottom: 100px;
`;

export const FadeInSection = styled.div`
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  ${(props) =>
    props.isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;
