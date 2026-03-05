import type { FC } from "react";
import "../style/App.scss";
import { Board } from "../../components/Board";

const App: FC = () => {
  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
