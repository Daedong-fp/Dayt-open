import React, { useState } from "react";
import styled from "styled-components";
import logoImg from "../images/project_Logo.png";
import openEyeImg from "../images/openeye.svg";
import closeEyeImg from "../images/closeeye.svg";
import checkImg from "../images/check.svg";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); // 비밀번호 확인 표시 상태
  const [passwordValue, setPasswordValue] = useState(""); // 비밀번호 입력값
  const [passwordCheckValue, setPasswordCheckValue] = useState(""); // 비밀번호 확인 입력값
  const [userId, setUserId] = useState(""); // 사용자 ID 입력값
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 메시지 상태
  const [passwordMatchError, setPasswordMatchError] = useState(""); // 비밀번호 일치 에러 메시지 상태

  const navigate = useNavigate();

  // 비밀번호 가시성 토글 함수
  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  // 사용자 ID 유효성 검사 함수
  const isUserIdValid = (value) => {
    const regex = /^[A-Za-z가-힣0-9!@#$%^&*()_+={}\[\]|;:'",.<>?/~]{4,12}$/;
    return regex.test(value);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|;:'",.<>?/~])[A-Za-z\d!@#$%^&*()_+={}\[\]|;:'",.<>?/~]{8,16}$/; // 8~16자의 영어, 숫자, 특수문자 포함
    return regex.test(password);
  };

  // 비밀번호 입력 시 호출되는 함수
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPasswordValue(value);
    if (!validatePassword(value)) {
      setPasswordError(
        "8 ~ 16자의 영어, 숫자, 특수문자를 모두 포함하여 다시 입력해주세요"
      );
    } else {
      setPasswordError("");
    }
    // 비밀번호가 일치하는지 확인
    if (passwordCheckValue && value !== passwordCheckValue) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  // 비밀번호 확인 입력 시 호출되는 함수
  const handlePasswordCheckChange = (e) => {
    const { value } = e.target;
    setPasswordCheckValue(value);
    if (value !== passwordValue) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사를 모두 통과한 경우에만 이동
    if (
      validatePassword(passwordValue) &&
      passwordValue === passwordCheckValue
    ) {
      navigate("/signUp/profil"); // 페이지 이동
    } else if (passwordValue !== passwordCheckValue) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Main>
      <Header />
      <SignUpContainer>
        <LogoUnder>
          <img src={logoImg} alt="Dayt" width="150px" />
          <h1>환영해요! DAYT이 처음이신가요?</h1>
        </LogoUnder>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="user-email">이메일</Label>
          <Input
            type="email"
            id="user-email"
            placeholder="워크스페이스 생성을 위한 이메일을 입력해주세요"
          />
          <Label htmlFor="user-id">아이디</Label>
          <UserIdField>
            <Input
              type="text"
              id="user-id"
              placeholder="4 ~ 12자의 영어, 한글, 숫자를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)} // 사용자 ID 입력값 업데이트
            />
            {isUserIdValid(userId) && (
              <CheckIcon src={checkImg} alt="Valid User ID" />
            )}
          </UserIdField>
          <Label htmlFor="user-password">비밀번호</Label>
          <PasswordField>
            <Input
              type={showPassword ? "text" : "password"} // 비밀번호 표시/숨기기
              id="user-password"
              placeholder="8 ~ 16자의 영어, 숫자, 특수문자를 모두 입력해주세요"
              required
              value={passwordValue}
              onChange={handlePasswordChange} // 비밀번호 입력 시 호출되는 함수
            />
            {passwordValue && (
              <EyeIcon
                src={showPassword ? openEyeImg : closeEyeImg}
                onClick={() => togglePasswordVisibility(setShowPassword)}
                alt="Toggle Password Visibility"
              />
            )}
          </PasswordField>

          {/* 비밀번호 유효성 검사 에러 메시지 표시 */}
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <Label htmlFor="user-passwordCheck" className="right">
            비밀번호 확인
          </Label>
          <PasswordField className="right">
            <Input
              type={showPasswordCheck ? "text" : "password"} // 비밀번호 확인 표시/숨기기
              id="user-passwordCheck"
              placeholder="설정한 비밀번호를 다시 한번 입력해주세요"
              required
              value={passwordCheckValue}
              onChange={handlePasswordCheckChange} // 비밀번호 확인 입력값 업데이트
            />
            {passwordCheckValue && (
              <EyeIcon
                src={showPasswordCheck ? openEyeImg : closeEyeImg}
                onClick={() => togglePasswordVisibility(setShowPasswordCheck)}
                alt="Toggle Password Visibility"
              />
            )}
          </PasswordField>

          {/* 비밀번호 일치 에러 메시지 표시 */}
          {passwordMatchError && (
            <ErrorMessage>{passwordMatchError}</ErrorMessage>
          )}

          <SubmitButton type="submit">다음으로</SubmitButton>
        </Form>
      </SignUpContainer>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  margin-top: 40px;
  margin: 0;
`;

const SignUpContainer = styled.div`
  text-align: center;
  background-color: #ffffff;
  padding: 40px;
  width: 410px;
  height: 650px;
`;

const LogoUnder = styled.div`
  h1 {
    margin-top: 20px;
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  img {
    width: 110px;
    height: 110px;
    margin-top: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 3%;
  font-size: 0.8em;
  font-weight: 700;
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left;
  &.right {
    margin-left: 10px;
    text-align: left;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
  border-radius: 13px;
  width: calc(100% - 22px);
`;

const UserIdField = styled.div`
  position: relative;
`;

const PasswordField = styled.div`
  position: relative;
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 13px;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const CheckIcon = styled.img`
  position: absolute;
  right: 13px;
  top: 40%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 7%;
  padding: 10px 20px;
  background-color: #fff16d;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1;
`;
