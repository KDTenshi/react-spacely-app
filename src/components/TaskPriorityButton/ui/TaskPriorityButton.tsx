import type { FC } from "react";
import style from "./TaskPriorityButton.module.scss";
import type { ListUnion, TTaskPriority } from "../../../shared/types/types";

interface TaskPriorityButtonProps {
  priority: TTaskPriority;
  isActive: boolean;
  setActive: () => void;
}

const priorityStyles: ListUnion<TTaskPriority> = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskPriorityButton: FC<TaskPriorityButtonProps> = ({ priority, isActive, setActive }) => {
  const className = isActive ? [priorityStyles[priority], style.Active].join(" ") : priorityStyles[priority];

  return (
    <button className={className} onClick={setActive} type="button">
      {priority}
    </button>
  );
};

export default TaskPriorityButton;
