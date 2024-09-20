import styled from "styled-components";
import LogoImg from "../images/project_Logo.png";
import { Header } from "../components/Header";

export const SignUpPage_Profil = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Logo src={LogoImg} alt="DAYT" />
        <Heading>환영해요! DAYT이 처음이신가요?</Heading>
        <Form>
          <Label1>이름</Label1>
          <Input
            type="text"
            placeholder="DAYT에서 사용할 닉네임을 입력해주세요"
          />
          <Label2>자기소개</Label2>
          <TextArea
            placeholder="회원님을 소개할 내용을 200자 이내로 입력해주세요"
            maxLength={200}
          />
          <Button type="submit">회원가입</Button>
        </Form>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.img`
  width: 110px;
  height: auto;
  margin-bottom: 20px;
  margin-top: -35px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label1 = styled.label`
  margin-bottom: 5px;
  margin-top: 8%;
  margin-left: 15px;
  font-size: 0.8em;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 13px;
  width: 100%;
`;

const Label2 = styled.label`
  margin-bottom: 5px;
  margin-top: 3%;
  margin-left: 15px;
  font-size: 0.8em;
  font-weight: 700;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 13px;
  height: 80px;
  width: 100%;
  resize: none;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ffe500;
  border: none;
  border-radius: 13px;
  font-size: 16px;
  cursor: pointer;
  width: 420px;

  &:hover {
    background-color: #ffcc00;
  }
`;
