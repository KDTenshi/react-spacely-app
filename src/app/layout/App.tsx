import type { FC } from "react";
import "../style/App.scss";
import { Board } from "../../components/Board";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import { HomePage } from "../../pages/HomePage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Body">
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
