import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import logoImg from "../images/project_Logo.png";
import openEyeImg from "../images/openeye.svg";
import closeEyeImg from "../images/closeeye.svg";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [userIdValue, setUserIdValue] = useState("");

  const dummyAccount = {
    userId: "dsmMinsu",
    password: "minsu0707@",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    if (
      userIdValue === dummyAccount.userId &&
      passwordValue === dummyAccount.password
    ) {
      alert("로그인 성공");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Main>
        <LoginContainer>
          <LogoImage>
            <img src={logoImg} alt="Dayt" width="150px" />
            <h1>복잡했던 프로젝트 관리, 이젠 DAYT에서 손쉽게</h1>
          </LogoImage>
          <Form onSubmit={handleLogin}>
            <Label id="id" htmlFor="user-id">
              아이디
            </Label>
            <input
              type="text"
              id="user-id"
              name="user-id"
              value={userIdValue}
              onChange={(e) => setUserIdValue(e.target.value)}
            />
            <Label id="passwordLabel" htmlFor="user-password">
              비밀번호
            </Label>
            <PasswordField>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              {passwordValue && (
                <EyeIcon
                  src={showPassword ? openEyeImg : closeEyeImg}
                  onClick={togglePasswordVisibility}
                  alt="Toggle Password Visibility"
                />
              )}
            </PasswordField>
            <button id="login" type="submit">
              로그인
            </button>
          </Form>
          <Register href="http://localhost:3000/signUp">
            DAYT의 회원이 아니신가요? 회원가입하기
          </Register>
        </LoginContainer>
      </Main>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  margin-top: 40px;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  z-index: 20;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  text-align: center;
  background-color: #ffffff;
  padding: 40px;
  width: 410px;
  height: 600px;

  h1 {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
`;

const LogoImage = styled.div`
  width: 410px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;

  img {
    width: 110px;
    height: 110px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input[type="text"],
  input[type="password"] {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dddddd;
    border-radius: 13px;
    width: calc(100% - 22px);
    height: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #fff16d;
    border: none;
    border-radius: 13px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 20px;

    &:hover {
      background-color: #ffdb4d;
    }
  }
`;

const PasswordField = styled.div`
  position: relative;
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const Register = styled.a`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: #333333;
  font-size: 0.9em;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background: #171212;
    position: absolute;
    left: 50%;
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const Label = styled.label`
  font-size: 0.8em;
  font-weight: 700;
  margin-bottom: 5px;

  &#id {
    margin-right: 83%;
  }

  &#passwordLabel {
    margin-top: 3%;
    margin-right: 80%;
  }
`;
