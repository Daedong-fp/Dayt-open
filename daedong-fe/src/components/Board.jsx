import React, { useState } from "react";
import styled from "styled-components";
import AddOp from "../images/addOp.svg";
import My from "../images/my.svg";
import Delete from "../images/delete.svg";
import Edit from "../images/edit.svg";

export const Board = ({ postRef }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleChange = (e) => setTask(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask("");
    handleClosePopup();
  };

  const handleOpenDeletePopup = (taskIndex) => {
    setTaskToDelete(taskIndex);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setTaskToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((_, index) => index !== taskToDelete));
    handleCloseDeletePopup();
  };

  const handleOpenEditPopup = (taskIndex) => {
    setTaskToEdit(taskIndex);
    setEditedTask(tasks[taskIndex]);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setTaskToEdit(null);
    setIsEditPopupOpen(false);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    setTasks(
      tasks.map((task, index) => (index === taskToEdit ? editedTask : task))
    );
    handleCloseEditPopup();
  };

  return (
    <Post ref={postRef}>
      <PostName>
        <h1>게시판</h1>
      </PostName>
      <PostField>
        <PostOp onClick={handleOpenPopup}>
          <img src={AddOp} alt="+" />
          <span>의견추가</span>
        </PostOp>
        <TaskListContainer tasksLength={tasks.length}>
          <TaskList>
            {tasks.map((task, index) => (
              <TaskItem key={index}>
                <UserName>
                  <MyImage src={My} />
                  <span>hahahahaha</span>
                  <img
                    src={Delete}
                    alt="삭제"
                    onClick={() => handleOpenDeletePopup(index)}
                  />
                  <img
                    src={Edit}
                    alt="수정"
                    onClick={() => handleOpenEditPopup(index)}
                  />
                </UserName>
                <Opinion>{task}</Opinion>
              </TaskItem>
            ))}
          </TaskList>
        </TaskListContainer>
      </PostField>
      {isPopupOpen && (
        <PopupOverlay>
          <Popup>
            <h2>의견 추가하기</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={task}
                onChange={handleChange}
                placeholder="할일을 입력하세요"
                required
              />
              <button type="submit">추가</button>
              <button type="button" onClick={handleClosePopup}>
                닫기
              </button>
            </form>
          </Popup>
        </PopupOverlay>
      )}
      {isDeletePopupOpen && (
        <PopupOverlay>
          <Popup>
            <h2>정말 삭제하시겠습니까?</h2>
            <ButtonContainer>
              <DeleteButton onClick={handleDeleteTask}>삭제</DeleteButton>
              <DeleteButton onClick={handleCloseDeletePopup} cancel>
                취소
              </DeleteButton>
            </ButtonContainer>
          </Popup>
        </PopupOverlay>
      )}
      {isEditPopupOpen && (
        <PopupOverlay>
          <Popup>
            <h2>의견 수정하기</h2>
            <form onSubmit={handleEditTask}>
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                placeholder="수정할 내용을 입력하세요"
                required
              />
              <button type="submit">수정</button>
              <button type="button" onClick={handleCloseEditPopup}>
                닫기
              </button>
            </form>
          </Popup>
        </PopupOverlay>
      )}
    </Post>
  );
};

const Post = styled.div`
  margin-top: 500px;
  width: 98vw;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.9em;
  margin-bottom: 45px;
`;

const PostField = styled.div`
  background-color: #e7e6e6b3;
  width: 1200px;
  height: 400px;
  border-radius: 30px;
  position: relative;
  padding: 20px;
`;

const PostOp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a1a1a1e2;
  width: 110px;
  height: 35px;
  border-radius: 15px;
  margin-left: 25px;
  margin-top: 25px;
  cursor: pointer;

  span {
    margin-left: 7px;
    margin-right: 2px;
  }

  img {
    margin-left: 4px;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 11px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      margin-top: 5px;
      cursor: pointer;

      &:first-of-type {
        background-color: #4caf50;
        color: white;
      }

      &:last-of-type {
        background-color: #f44336;
        color: white;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px;
`;

const DeleteButton = styled.button`
  padding: 14px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? "#f44336" : "#4caf50")};
  color: white;
  width: 100px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => (props.tasksLength > 3 ? "90px" : "90px")};
  left: 25px;
  right: 25px;
  bottom: 25px;
  overflow-y: auto;
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TaskItem = styled.div`
  position: relative;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 25px;
  white-space: nowrap;
  width: 300px;
  height: 70px;
  margin-right: 15px;
  margin-bottom: 15px;
  margin-left: 38px;
  margin-top: 12px;
`;

const UserName = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 12px;
    cursor: pointer;
  }
`;

const MyImage = styled.img`
  top: 10px;
  left: 10px;
  width: 12px;
  margin-left: 8px;
`;

const Opinion = styled.div`
  margin-left: 12px;
  margin-top: 10px;
  font-size: 0.9em;
`;
