import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import ADD from "../images/addProject.svg";
import Host from "../images/my.svg";
import Delete from "../images/delete.svg";
import Edit from "../images/edit.svg";

export const WorkSpace_Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false); // 참여하기 팝업 상태
  const [workspaces, setWorkspaces] = useState([]);
  const [newWorkspace, setNewWorkspace] = useState({
    name: "",
    description: "",
  });
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
  const [workspaceToEdit, setWorkspaceToEdit] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setError("");
  };

  const toggleJoinPopup = () => {
    setIsJoinPopupOpen(!isJoinPopupOpen); // 팝업 열고 닫기 토글
  };

  const handleNameChange = (e) => {
    setNewWorkspace((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setNewWorkspace((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newWorkspace.name.trim() === "" ||
      newWorkspace.description.trim() === ""
    ) {
      setError("워크스페이스 이름과 설명을 입력해주세요.");
      return;
    }

    setWorkspaces((prev) => [...prev, newWorkspace]);
    setIsPopupOpen(false);
    setNewWorkspace({ name: "", description: "" });
    setError("");
  };

  const handleShowAllToggle = () => {
    setShowAll(!showAll);
  };

  const handleDeleteClick = (index) => {
    setWorkspaceToDelete(index);
  };

  const handleEditClick = (index) => {
    setWorkspaceToEdit(index);
  };

  const confirmDelete = () => {
    setWorkspaces((prev) =>
      prev.filter((_, index) => index !== workspaceToDelete)
    );
    setWorkspaceToDelete(null);
  };

  const displayedWorkspaces = showAll ? workspaces : workspaces.slice(0, 8);

  return (
    <Main>
      <Header />
      <Text>
        DAYT와 함께 새로운 프로젝트를 만들어보세요!
        <NewWorkspaceButton onClick={togglePopup}>
          <img src={ADD} alt="추가" className="Addproject" />새 워크스페이스
          생성하기
        </NewWorkspaceButton>
      </Text>
      {isPopupOpen && (
        <PopupOverlay onClick={togglePopup}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <PopupHeader>
              <CloseButton onClick={togglePopup}>×</CloseButton>
              <PopupTitle>프로젝트 생성</PopupTitle>
            </PopupHeader>
            <PopupContent>
              <Form onSubmit={handleSubmit}>
                <Label>프로젝트 이름</Label>
                <Input
                  type="text"
                  placeholder="15자 이내로 입력해주세요"
                  value={newWorkspace.name}
                  onChange={handleNameChange}
                />
                <Label>프로젝트 설명</Label>
                <Textarea
                  placeholder="30자 이내로 입력해주세요"
                  maxLength={30}
                  value={newWorkspace.description}
                  onChange={handleDescriptionChange}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton type="submit">워크스페이스 생성하기</SubmitButton>
              </Form>
            </PopupContent>
          </Popup>
        </PopupOverlay>
      )}
      {workspaceToDelete !== null && (
        <PopupOverlay onClick={() => setWorkspaceToDelete(null)}>
          <DeletePopup onClick={(e) => e.stopPropagation()}>
            <PopupHeader>
              <PopupTitle2>프로젝트를 삭제하시겠습니까?</PopupTitle2>
            </PopupHeader>
            <PopupContent2>
              <SubmitButtonDelete1 onClick={confirmDelete}>
                예
              </SubmitButtonDelete1>
              <SubmitButtonDelete2 onClick={() => setWorkspaceToDelete(null)}>
                아니오
              </SubmitButtonDelete2>
            </PopupContent2>
          </DeletePopup>
        </PopupOverlay>
      )}
      {workspaceToEdit !== null && (
        <PopupOverlay onClick={() => setWorkspaceToEdit(null)}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <PopupHeader>
              <CloseButton onClick={() => setWorkspaceToEdit(null)}>
                ×
              </CloseButton>
              <PopupTitle>프로젝트 수정</PopupTitle>
            </PopupHeader>
            <PopupContent>
              <Form>
                <Label>프로젝트 이름</Label>
                <Input
                  type="text"
                  value={workspaces[workspaceToEdit].name}
                  onChange={(e) =>
                    setWorkspaces((prev) =>
                      prev.map((workspace, index) =>
                        index === workspaceToEdit
                          ? { ...workspace, name: e.target.value }
                          : workspace
                      )
                    )
                  }
                />
                <Label>프로젝트 설명</Label>
                <Textarea
                  value={workspaces[workspaceToEdit].description}
                  onChange={(e) =>
                    setWorkspaces((prev) =>
                      prev.map((workspace, index) =>
                        index === workspaceToEdit
                          ? { ...workspace, description: e.target.value }
                          : workspace
                      )
                    )
                  }
                />
                <SubmitButton
                  type="button"
                  onClick={() => setWorkspaceToEdit(null)}
                >
                  수정 완료
                </SubmitButton>
              </Form>
            </PopupContent>
          </Popup>
        </PopupOverlay>
      )}

      {isJoinPopupOpen && (
        <PopupOverlay onClick={toggleJoinPopup}>
          <Popup3 onClick={(e) => e.stopPropagation()}>
            <PopupHeaderJoin>
              <PopupTitleJoin>초대코드를 입력해주세요</PopupTitleJoin>
            </PopupHeaderJoin>
            <PopupContentJoin>
              <JoinInput type="text" id="Join" />
              <PopupButtonContainer>
                <JoinSubmitButton onClick={toggleJoinPopup}>
                  확인
                </JoinSubmitButton>
                <JoinCancelButton onClick={toggleJoinPopup}>
                  취소
                </JoinCancelButton>
              </PopupButtonContainer>
            </PopupContentJoin>
          </Popup3>
        </PopupOverlay>
      )}

      <JoinContainer>
        <SectionTitle>생성된 프로젝트</SectionTitle>
        <JoinButton onClick={toggleJoinPopup}>
          <img src={ADD} alt="추가" />
          참여하기
        </JoinButton>
      </JoinContainer>

      <WorkspaceContainer>
        <WorkspaceList>
          {displayedWorkspaces.map((workspace, index) => (
            <WorkspaceCard key={index}>
              <WorkspaceTitle>
                {workspace.name}
                <img
                  src={Delete}
                  alt="삭제"
                  id="Delete"
                  onClick={() => handleDeleteClick(index)}
                />
                <img
                  src={Edit}
                  alt="수정"
                  id="Edit"
                  onClick={() => handleEditClick(index)}
                />
              </WorkspaceTitle>
              <WorkspaceDescription>
                {workspace.description}
              </WorkspaceDescription>
              <UserContainer>
                <UserName>
                  <img src={Host} alt="호스트" className="HostIcon" />
                  User
                </UserName>
              </UserContainer>
            </WorkspaceCard>
          ))}
        </WorkspaceList>
        {workspaces.length > 8 && (
          <ShowMoreButton onClick={handleShowAllToggle}>
            {showAll ? "간략히 보기" : "더 보기"}
          </ShowMoreButton>
        )}
      </WorkspaceContainer>
      {workspaces.length === 0 && (
        <NoWorkspaceMessage>생성된 워크스페이스가 없습니다</NoWorkspaceMessage>
      )}
    </Main>
  );
};

const JoinInput = styled.input`
  width: 70%; /* 입력창 크기를 줄임 */
  padding: 6px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 13px;
  margin-left: 12%;
`;

const JoinSubmitButton = styled.button`
  width: 80px;
  height: 30px;
  font-size: 13px;
  background-color: #ffff;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  border: 1px solid gray;
  margin-left: 10%;

  &:hover {
    background-color: #c5c5c5;
  }
`;

const JoinCancelButton = styled.button`
  width: 80px;
  height: 30px;
  font-size: 13px;
  background-color: #ffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid gray;
  font-weight: 600;
  margin-right: 11%;

  &:hover {
    background-color: #c5c5c5;
  }
`;

const Popup3 = styled.div`
  background: white;
  width: 300px;
  height: 135px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PopupTitleJoin = styled.div`
  margin: 0;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`;

const PopupHeaderJoin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const PopupContentJoin = styled.div`
  margin-top: -10px;
`;

const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #ffff;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Text = styled.div`
  background-color: #fff;
  padding: 50px;
  width: 100%;
  height: 200px;
  max-width: 100vw;
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
  font-weight: 700;
  margin-top: 50px;
`;

const NewWorkspaceButton = styled.button`
  background-color: #ffeb3b;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 35px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 300px;
  height: 60px;

  &:hover {
    background-color: #fdd835;
  }

  .Addproject {
    width: 20px;
    height: 17px;
    margin-right: 40px;
  }
`;

const NoWorkspaceMessage = styled.div`
  margin-top: 11%;
  font-size: 18px;
  color: #9e9e9e;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  width: 900px;
  height: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DeletePopup = styled(Popup)`
  width: 350px;
  height: 140px;
`;

const SubmitButtonDelete1 = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid gray;
  margin-top: 5px;
  font-weight: 600;
  background-color: #ffff;

  &:hover {
    background-color: #c5c5c5;
  }
`;

const SubmitButtonDelete2 = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid gray;
  margin-top: 5px;
  font-weight: 600;
  background-color: #ffff;

  &:hover {
    background-color: #cac5c5;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const PopupTitle = styled.h2`
  margin: 0;
  font-size: 21px;
`;

const PopupTitle2 = styled.h2`
  margin: 0;
  font-size: 16px;
  margin-top: 37px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupContent2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 1px;
  font-weight: 600;
  margin-right: 400px;
`;

const Input = styled.input`
  width: 500px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  width: 500px;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  resize: none;
`;

const JoinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  margin-top: 20px;
  padding: 0 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 220px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 35px;

  &:hover {
    background-color: #333;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  margin-left: -45px;
`;

const WorkspaceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80%;
  margin-top: 20px;
  gap: 20px;
  margin-left: -130px;
  flex-direction: column;
`;

const WorkspaceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  width: 90vw;
  gap: 40px;
`;

const WorkspaceCard = styled.div`
  border: 1px solid #e0e0e0;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 150px;
  position: relative;
`;

const WorkspaceTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 12px;
  margin-left: 16px;
  position: relative;

  #Delete {
    position: absolute;
    margin-left: 160px;
    width: 12px;
    margin-top: 2px;
    right: 30px;
  }
  #Edit {
    position: absolute;
    width: 12px;
    margin-left: 183px;
    margin-top: 3px;
    right: 10px;
  }
  img:hover {
    cursor: pointer;
  }
`;

const WorkspaceDescription = styled.p`
  font-size: 14px;
  color: #4e4949;
  margin-bottom: 20px;
  margin-top: -5px;
  margin-left: 17px;
  flex-grow: 1;
`;

const UserContainer = styled.div`
  width: 86.4%;
  background-color: #ffff;
  height: 1px;
  display: flex;
  align-items: center;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid #e0e0e0;
  padding: 20px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #424242;

  .HostIcon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const JoinButton = styled.button`
  background-color: #fff16d;
  border-style: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  width: 150px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;

  &:hover {
    background-color: #fdd835;
  }

  img {
    width: 11px;
    margin-left: 20px;
    margin-right: 15px;
  }
`;

const ShowMoreButton = styled.button`
  margin-top: 20px;
  background-color: #ffeb3b;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #fdd835;
  }
`;
