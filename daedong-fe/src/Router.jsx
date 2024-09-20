import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { WorkSpace_ProjectPage } from "./pages/WorkSpace_Project";
import { SignUpPage_Profil } from "./pages/SignUpPage_Profil";
import { WorkSpace_Main } from "./pages/WorkSpace_Main";
import { TodoListPage } from "./pages/TodoList";
import { AccountSettings } from "./pages/AccountSettings";
import { HomePage } from "./pages/HomePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/todoList" element={<TodoListPage />} />
        <Route path="/signUp/profil" element={<SignUpPage_Profil />} />
        <Route path="/workspace/main" element={<WorkSpace_Main />} />
        <Route path="/workspace/project" element={<WorkSpace_ProjectPage />} />
        <Route path="/accountSetting" element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
