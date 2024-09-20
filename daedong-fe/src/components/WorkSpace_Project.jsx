import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ReactSortable } from "react-sortablejs";
import addButtonImg from "../images/add.svg";
import { Header } from "../components/Header";
import Colon from "../images/colon.svg";
import Delete from "../images/delete.svg";
import Edit from "../images/edit.svg";
import My from "../images/my.svg";
import Move from "../images/move.svg";
import { Board } from "../components/Board";

export const WorkSpace_ProjectPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [isBoardVisible, setIsBoardVisible] = useState(false);

  const handleAddClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleAddTodo = () => {
    const todoInput = document.getElementById("todo-input").value;
    if (todoInput.trim()) {
      setTodos([...todos, { id: todos.length + 1, text: todoInput }]);
    }
    handleClosePopup();
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    setTodoToDelete(null);
  };

  const handleConfirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
    setInProgress(inProgress.filter((todo) => todo.id !== todoToDelete.id));
    setDone(done.filter((todo) => todo.id !== todoToDelete.id));
    handleCloseDeletePopup();
  };

  const handleEditClick = (todo) => {
    setTodoToEdit(todo);
    setEditedText(todo.text);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setTodoToEdit(null);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoToEdit.id ? { ...todo, text: editedText } : todo
    );
    const updatedInProgress = inProgress.map((todo) =>
      todo.id === todoToEdit.id ? { ...todo, text: editedText } : todo
    );
    const updatedDone = done.map((todo) =>
      todo.id === todoToEdit.id ? { ...todo, text: editedText } : todo
    );

    setTodos(updatedTodos);
    setInProgress(updatedInProgress);
    setDone(updatedDone);
    handleCloseEditPopup();
  };

  const handleSort = (newList, listType) => {
    switch (listType) {
      case "todos":
        setTodos(newList);
        break;
      case "inProgress":
        setInProgress(newList);
        break;
      case "done":
        setDone(newList);
        break;
      default:
        break;
    }
  };

  const toggleBoardVisibility = () => {
    setIsBoardVisible(!isBoardVisible);
  };

  return (
    <Wrapper>
      <Header />
      <Body>
        <ProjectName>
          <h1>DAYT</h1>
          <ProjectCode>
            <JoinCode>초대코드</JoinCode>
            <img src={Colon} alt=":" id="Colon" />
            <span id="codeName">daaaaayt</span>
          </ProjectCode>
        </ProjectName>
        <Act>
          <Column className="canDo">
            <Title className="canDo">
              <h3>해야할 일</h3>
              <img
                id="add_button"
                src={addButtonImg}
                alt="add"
                onClick={handleAddClick}
              />
            </Title>
            <ReactSortable
              list={todos}
              setList={(newList) => handleSort(newList, "todos")}
              group="shared"
              animation={200}
            >
              {todos.map((todo) => (
                <TodoItem key={todo.id}>
                  <UserName>
                    <img src={My} id="My" alt="User Icon" />
                    <UserNameText>사용자 이름</UserNameText>
                  </UserName>
                  <TodoText>{todo.text}</TodoText>
                  <TodoIcons>
                    <DeleteIcon onClick={() => handleDeleteClick(todo)}>
                      <img src={Delete} alt="Del" id="Delete" />
                    </DeleteIcon>
                    <EditIcon onClick={() => handleEditClick(todo)}>
                      <img src={Edit} alt="Edit" id="Edit" />
                    </EditIcon>
                  </TodoIcons>
                </TodoItem>
              ))}
            </ReactSortable>
          </Column>
          <Column className="ing">
            <Title className="ing">
              <h3>진행중</h3>
            </Title>
            <ReactSortable
              list={inProgress}
              setList={(newList) => handleSort(newList, "inProgress")}
              group="shared"
              animation={200}
            >
              {inProgress.map((todo) => (
                <TodoItem key={todo.id}>
                  <UserName>
                    <img src={My} id="My" alt="User Icon" />
                    <UserNameText>사용자 이름</UserNameText>
                  </UserName>
                  <TodoText>{todo.text}</TodoText>
                  <TodoIcons>
                    <DeleteIcon onClick={() => handleDeleteClick(todo)}>
                      <img src={Delete} alt="Del" id="Delete" />
                    </DeleteIcon>
                    <EditIcon onClick={() => handleEditClick(todo)}>
                      <img src={Edit} alt="Edit" id="Edit" />
                    </EditIcon>
                  </TodoIcons>
                </TodoItem>
              ))}
            </ReactSortable>
          </Column>
          <Column className="finish">
            <Title className="finish">
              <h3>완료</h3>
            </Title>
            <ReactSortable
              list={done}
              setList={(newList) => handleSort(newList, "done")}
              group="shared"
              animation={200}
            >
              {done.map((todo) => (
                <TodoItem key={todo.id}>
                  <UserName>
                    <img src={My} id="My" alt="User Icon" />
                    <UserNameText>사용자 이름</UserNameText>
                  </UserName>
                  <TodoText>{todo.text}</TodoText>
                  <TodoIcons>
                    <DeleteIcon onClick={() => handleDeleteClick(todo)}>
                      <img src={Delete} alt="Del" id="Delete" />
                    </DeleteIcon>
                    <EditIcon onClick={() => handleEditClick(todo)}>
                      <img src={Edit} alt="Edit" id="Edit" />
                    </EditIcon>
                  </TodoIcons>
                </TodoItem>
              ))}
            </ReactSortable>
          </Column>
          <MoveIcon onClick={toggleBoardVisibility}>
            <img src={Move} alt="이동" />
          </MoveIcon>
        </Act>
      </Body>

      {showPopup && (
        <>
          <Backdrop onClick={handleClosePopup} />
          <Popup>
            <h3>NEW TODO</h3>
            <PopupIn>
              <TextArea
                id="todo-input"
                placeholder="추가할 내용을 입력해주세요"
              />
            </PopupIn>
            <Buttons>
              <Button id="ADD" onClick={handleAddTodo}>
                ADD
              </Button>
              <Button id="DoCANCEL" onClick={handleClosePopup}>
                CANCEL
              </Button>
            </Buttons>
          </Popup>
        </>
      )}
      {showDeletePopup && (
        <>
          <Backdrop onClick={handleCloseDeletePopup} />
          <Popup small>
            <h3>삭제하시겠습니까?</h3>
            <Buttons>
              <Button id="CONFIRM" onClick={handleConfirmDelete}>
                예
              </Button>
              <Button id="CANCEL" onClick={handleCloseDeletePopup}>
                아니요
              </Button>
            </Buttons>
          </Popup>
        </>
      )}
      {showEditPopup && (
        <>
          <Backdrop onClick={handleCloseEditPopup} />
          <Popup>
            <h3>Edit TODO</h3>
            <PopupIn>
              <TextArea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="수정할 내용을 입력해주세요"
              />
            </PopupIn>
            <Buttons>
              <Button id="SAVE" onClick={handleSaveEdit}>
                SAVE
              </Button>
              <Button id="EditCANCEL" onClick={handleCloseEditPopup}>
                CANCEL
              </Button>
            </Buttons>
          </Popup>
        </>
      )}
      <Board isVisible={isBoardVisible}>
        <h3>Board Content</h3>
        <Board />
      </Board>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 97vh;
  background-color: white;
  margin: 0;
  font-family: "Averia Sans Libre", sans-serif;
  font-weight: 700;
  overflow: auto;
  margin-top: 1%;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
  font-size: 1.5em;
`;

const ProjectCode = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: 0.8em;
  font-weight: 600;
  width: 300px;
  height: 70px;
  margin-top: -20px;

  img {
    width: 12px;
    margin-top: 3px;
  }
`;

const JoinCode = styled.div`
  margin-right: 5px;
  background-color: #efef2c;
  font-size: 0.8em;
  width: 75px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
`;

const Act = styled.div`
  position: relative;
  display: flex;
  width: 1300px;
  justify-content: flex;
  margin-top: 0px 20px;
  justify-content: center;

  & > :nth-child(1) {
    background-color: rgba(255, 126, 126, 0.295);
  }
  & > :nth-child(2) {
    background-color: rgba(104, 254, 141, 0.295);
  }
  & > :nth-child(3) {
    background-color: rgba(102, 126, 246, 0.295);
  }
`;
const Column = styled.div`
  background: #f5f5f5;
  border-radius: 35px;
  width: 370px;
  height: 550px;
  margin: 0 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  #add_button {
    margin-top: 8px;
    margin-right: 25px;
  }
  #add_button:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  padding: 10px;
  z-index: 10;
  border-radius: 35px 35px 0 0;
  width: 100%;
  box-sizing: border-box;

  h3 {
    margin-left: 15px;
  }

  background-color: rgba(255, 255, 255, 0.8);
  color: #000;

  &.canDo {
    background-color: rgba(255, 126, 126, 1);
  }

  &.ing {
    background-color: rgba(104, 254, 141, 1);
  }

  &.finish {
    background-color: rgba(102, 126, 246, 1);
  }
`;

const TodoItem = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px 20px 22px 22px;
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 300px;
  height: 90px;
  margin-left: 6%;
  box-shadow: 0 4px 1px #ffd700;
  margin-top: 25px;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  img {
    width: 12px;
  }
`;

const UserNameText = styled.span`
  margin-left: 8px;
  font-size: 0.9rem;
`;

const TodoText = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
  align-self: flex-start;
  flex-grow: 1;
  margin-left: 22px;
`;

const TodoIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
  margin-left: auto;
`;

const DeleteIcon = styled.div`
  cursor: pointer;

  img {
    width: 12px;
  }
`;

const EditIcon = styled.div`
  cursor: pointer;

  img {
    width: 13px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 20;
  width: ${(props) => (props.small ? "300px" : "400px")};
  text-align: center;
`;

const PopupIn = styled.div`
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:nth-of-type(1) {
    margin-left: 10px;
    background: #4caf50;
    color: white;
  }
  &:nth-of-type(2) {
    margin-right: 10px;
    background: #f44336;
    color: white;
  }
`;
const MoveIcon = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 40px);
  animation: bounce 1s infinite;
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-20px);
    }
    60% {
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;
