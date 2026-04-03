import type { FC } from "react";
import "../style/App.scss";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import { HomePage } from "../../pages/HomePage";
import { CreateBoardPage } from "../../pages/CreateBoardBage";
import { BoardPage } from "../../pages/BoardPage";
import { BoardsPage } from "../../pages/BoardsPage";
import { EditBoardPage } from "../../pages/EditBoardPage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { Header } from "../../features/Layout/components/Header";
import { SideMenu } from "../../features/Layout/components/SideMenu";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Body">
          <SideMenu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateBoardPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:boardID" element={<BoardPage />} />
            <Route path="/boards/:boardID/edit" element={<EditBoardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
