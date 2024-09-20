import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import InputCheckImg from "../images/InputCheck.png";

export const AccountSettings = () => {
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNameImg, setShowNameImg] = useState(false);
  const [showIntroImg, setShowIntroImg] = useState(false);
  const [showPasswordImg, setShowPasswordImg] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setShowNameImg(e.target.value.length > 0);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
    setShowIntroImg(e.target.value.length > 0);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    // currentPassword와 newPassword가 일치할 때만 이미지를 표시
    setShowPasswordImg(e.target.value === currentPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 데이터:", {
      name,
      introduction,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    // 여기에 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
  };

  return (
    <Container>
      <Header />
      <Title>내 계정 설정</Title>
      <Main>
        <Form id="profileForm" onSubmit={handleSubmit}>
          <Section>
            <h2>이름</h2>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="변경할 이름을 입력해주세요"
            />
            <Changed show={name.length > 0}>변경되었습니다</Changed>
            <CheckImg src={InputCheckImg} alt="check" show={showNameImg} />
          </Section>
          <Section>
            <h2>자기소개</h2>
            <Textarea
              value={introduction}
              onChange={handleIntroductionChange}
              maxLength={1200}
              placeholder="회원님을 새롭게 소개할 내용을 입력해주세요 (200자 이내)"
              cols={30}
              rows={10}
            />
            <Changed show={introduction.length > 0}>변경되었습니다</Changed>
            <CheckImg src={InputCheckImg} alt="check" show={showIntroImg} />
          </Section>
          <Section>
            <h2>비밀번호 변경</h2>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="기존의 비밀번호를 입력해주세요"
            />
            <Nope show={currentPassword.length > 0}>
              비밀번호가 맞지 않습니다
            </Nope>
            <Input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="새로운 비밀번호를 입력해주세요"
            />
            <CheckImg src={InputCheckImg} alt="check" show={showPasswordImg} />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새로운 비밀번호를 다시 한번 입력해주세요"
            />
            <Changed show={confirmPassword.length > 0}>변경되었습니다</Changed>
          </Section>
          <ButtonContainer>
            <Button type="submit">확인</Button>
            <Button type="button">내 계정 삭제하기</Button>
          </ButtonContainer>
        </Form>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Pretendard-Regular", sans-serif;
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
`;

const Section = styled.section`
  margin: auto;
  margin-bottom: 20px;
  position: relative;
  h2 {
    margin: 0;
    font-size: 15px;
  }
`;

const Input = styled.input`
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid gray;
  font-weight: 700;
  font-family: "Pretendard-Regular", sans-serif;
`;

const Textarea = styled.textarea`
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid gray;
  font-weight: 700;
  font-family: "Pretendard-Regular", sans-serif;
  resize: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 395px;
`;

const Button = styled.button`
  background-color: #fff16d;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-family: "Pretendard-Regular", sans-serif;
  font-weight: 700;
  border-radius: 20px;
  margin-right: 5px;
  width: 140px;
  height: 60px;
  text-align: center;
`;

const CheckImg = styled.img`
  position: absolute;
  right: -60px;
  top: 55%;
  transform: translateY(-50%);
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Changed = styled.p`
  color: blue;
  font-size: 12px;
  margin: 0;
  margin-left: 15px;
  margin-top: 3px;
  font-family: "Pretendard-Regular", sans-serif;
  font-weight: 700;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Nope = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  margin-left: 15px;
  margin-top: 3px;
  font-family: "Pretendard-Regular", sans-serif;
  font-weight: 700;
  display: ${(props) => (props.show ? "block" : "none")};
`;
