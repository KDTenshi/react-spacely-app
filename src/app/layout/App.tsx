import type { FC } from "react";
import "../style/App.scss";
import { Board } from "../../components/Board";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="Body">
        <Menu />
        <Board />
      </div>
    </div>
  );
};

export default App;
