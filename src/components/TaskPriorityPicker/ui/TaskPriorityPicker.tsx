import style from "./TaskPriorityPicker.module.scss";
import { TaskPriorityButton } from "../../TaskPriorityButton";
import type { TTaskPriority } from "../../../shared/types/types";
import type { FC } from "react";

interface TaskPriorityPickerProps {
  activePriority: TTaskPriority;
  setActivePriority: (arg: TTaskPriority) => void;
}

const TaskPriorityPicker: FC<TaskPriorityPickerProps> = ({ activePriority, setActivePriority }) => {
  return (
    <div className={style.Picker}>
      <TaskPriorityButton
        priority="low"
        isActive={activePriority === "low"}
        setActive={() => setActivePriority("low")}
      />
      <TaskPriorityButton
        priority="moderate"
        isActive={activePriority === "moderate"}
        setActive={() => setActivePriority("moderate")}
      />
      <TaskPriorityButton
        priority="high"
        isActive={activePriority === "high"}
        setActive={() => setActivePriority("high")}
      />
    </div>
  );
};

export default TaskPriorityPicker;
