import styled from "styled-components";
import Difficulty from "../images/mainPage_img2.png";

export const CTA = () => {
  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <CTAWrapper>
      <img src={Difficulty} alt="Difficulty" />
      <CTAButton onClick={handleClick}>시작하기 ➔</CTAButton>
    </CTAWrapper>
  );
};

const CTAWrapper = styled.div`
  margin: 180px 0;
  img {
    margin: 10px;
    margin-bottom: 90px;
  }
`;

const CTAButton = styled.button`
  width: 350px;
  height: 75px;
  padding: 10px 0px 10px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 33px;
  cursor: pointer;
  margin-bottom: 500px;
  display: flex;
  justify-content: center;
  margin: auto;
  align-items: center;
  font-family: "Pretendard";
  font-weight: bold;
`;
