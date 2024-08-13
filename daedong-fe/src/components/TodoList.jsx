import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import addButton from '../assest/addButton.png';
import deleteButton from '../assest/deletebutton.png';
import checkButton from '../assest/check.png';
import checkedButton from '../assest/checked.png';

const popAnimation = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const explosionAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  font-family: 'Pretendard-Regular', sans-serif;
  font-weight: 700;
  background-color: white;
  text-align: center;
`;

const Today = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-top: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-right: 20px;
  background-color: white;
`;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  justify-content: flex-start;
  align-items: center;
  height: 540px;
  margin-right: 45px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  width: 25%;
`;

const TodoTitle = styled.p`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0px;
  padding: 8px 0 5px;
  height: 50px;
  width: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

const TodoAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  width: 320px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
  img {
    position: relative;
    left: 70px;
  }
  span {
    display: flex;
    justify-content: center;
    margin-left: 20px;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  span {
    display: flex;
    justify-content: center;
    margin-left: -10px;
  }
`;

const TodoItem = styled.li`
  margin: auto;
  padding: 8px;
  margin-bottom: 20px;
  height: 50px;
  width: 320px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  animation: ${props => props.moving ? explosionAnimation : popAnimation} 0.3s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const DoneBox = styled(TodoBox)`
  margin-left: 20px;
  margin-right: 0;
  width: 25%;
`;

const DoneTodoItem = styled(TodoItem)`
  margin-top: 20px;
  color: gray;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Popup = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  background-color: #fff;
  padding: 20px;
  width: 30%;
  height: 390px;
  border-radius: 50px;
  z-index: 1001;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  animation: ${props => props.show ? popAnimation : 'none'} 0.3s ease-out;
`;

const PopupInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  width: 99%;
  height: 100%;
  z-index: 55;
  text-align: center;
  font-family: 'Pretendard-Regular';
  font-weight: 700;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  height: 30%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9%;
`;

const Button = styled.button`
  width: 40%;
  height: 50%;
  background-color: rgba(226, 226, 226, 0.2);
  border-style: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

const CheckBox = styled.img`
  width: 15px;
  height: 13px;
  margin-left: 10px;
  cursor: pointer;
`;

const DeleteButton = styled.img`
  width: 17px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const TodoText = styled.span`
  flex-grow: 1;
  text-align: center;
  margin-left: 10px;
`;

const formatDate = () => {
  const now = new Date();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const day = days[now.getDay()];
  
  return `${year}.${month}.${date}.${day}`;
};

const TodoListPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentDate, setCurrentDate] = useState(formatDate());
  const [movingIndex, setMovingIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(formatDate());
    }, 1000);

    // Load data from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedDoneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];
    setTodos(savedTodos);
    setDoneTodos(savedDoneTodos);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever todos or doneTodos change
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
  }, [todos, doneTodos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodos = [...todos, { text: newTodo, checked: false }];
      setTodos(newTodos);
      setNewTodo('');
      setShowPopup(false);
    }
  };

  const handleCheckTodo = (index, isDone = false) => {
    setMovingIndex(index);
    setTimeout(() => {
      if (!isDone) {
        const updatedTodos = [...todos];
        const [movedTodo] = updatedTodos.splice(index, 1);
        movedTodo.checked = true;
        const newDoneTodos = [...doneTodos, movedTodo];
        setTodos(updatedTodos);
        setDoneTodos(newDoneTodos);
      } else {
        const updatedDoneTodos = [...doneTodos];
        const [movedTodo] = updatedDoneTodos.splice(index, 1);
        movedTodo.checked = false;
        const newTodos = [...todos, movedTodo];
        setDoneTodos(updatedDoneTodos);
        setTodos(newTodos);
      }
      setMovingIndex(null);
    }, 0);
  };

  const handleDeleteTodo = (index, done = false) => {
    if (done) {
      const newDoneTodos = doneTodos.filter((_, i) => i !== index);
      setDoneTodos(newDoneTodos);
    } else {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  return (
    <Container>
      <Header />
      <Today>
        <h1>{currentDate}</h1>
      </Today>
      <TodoContainer>
        <TodoBox>
          <TodoTitle>ToDo</TodoTitle>
          <TodoAdd onClick={() => setShowPopup(true)}>
            <span>새 할일 추가</span>
            <img src={addButton} alt="Add" />
          </TodoAdd>
          <TodoList>
            {todos.map((todo, index) => (
              <TodoItem key={index} moving={movingIndex === index}>
                <CheckBox 
                  src={todo.checked ? checkedButton : checkButton} 
                  alt="Check" 
                  onClick={() => handleCheckTodo(index)} 
                />
                <TodoText>{todo.text}</TodoText>
                <DeleteButton 
                  src={deleteButton} 
                  alt="Delete" 
                  onClick={() => handleDeleteTodo(index)}
                />
              </TodoItem>
            ))}
          </TodoList>
        </TodoBox>
        
        <DoneBox>
          <TodoTitle>Done</TodoTitle>
          <TodoList>
            {doneTodos.map((todo, index) => (
              <DoneTodoItem key={index}>
                <CheckBox 
                  src={checkedButton} 
                  alt="Checked" 
                  onClick={() => handleCheckTodo(index, true)}
                />
                <TodoText>{todo.text}</TodoText>
                <DeleteButton 
                  src={deleteButton} 
                  alt="Delete" 
                  onClick={() => handleDeleteTodo(index, true)}
                />
              </DoneTodoItem>
            ))}
          </TodoList>
        </DoneBox>
      </TodoContainer>
      <Backdrop show={showPopup} onClick={() => setShowPopup(false)} />
      <Popup show={showPopup}>
        <h3>NEW TODO</h3>
        <PopupInput
          type="text"
          placeholder="추가할 내용을 입력해주세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <ButtonContainer>
          <Button onClick={handleAddTodo}>ADD</Button>
          <Button onClick={() => setShowPopup(false)}>CANCEL</Button>
        </ButtonContainer>
      </Popup>
    </Container>
  );
};

export default TodoListPage;
