import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AccountSettings from './components/AccountSettings';
import TodoListPage from './components/TodoList';
import MainPage from './components/Main';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: white;
  }

  * {
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
  <Route path="/main" element={<MainPage />} />
  <Route path="/setting" element={<AccountSettings />} />
  <Route path="/todo" element={<TodoListPage />} />
      </Routes>
    </Router>
  );
};

export default App;