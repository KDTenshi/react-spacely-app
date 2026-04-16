import type { FC } from "react";
import { Route, Routes } from "react-router";
import { BoardPage } from "../../pages/BoardPage";
import { BoardsPage } from "../../pages/BoardsPage";
import { CreateBoardPage } from "../../pages/CreateBoardBage";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateBoardPage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/boards/:boardID" element={<BoardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
    </Routes>
  );
};

export default Router;
