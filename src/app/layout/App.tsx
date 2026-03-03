import type { FC } from "react";
import "../style/App.scss";
import { useAppDispatch } from "../store/appStore";
import { addTask } from "../../shared/store/tasksSlice";
import { Board } from "../../components/Board";

const App: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch(addTask())} className="Button">
        Add task
      </button>
      <Board />
    </div>
  );
};

export default App;
