import type { FC } from "react";
import style from "./TaskPriorityDisplay.module.scss";
import type { ListUnion, TTaskPriority } from "../../../shared/types/types";

interface TaskPriorityDisplayProps {
  priority: TTaskPriority;
}

const priorityStyles: ListUnion<TTaskPriority> = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskPriorityDisplay: FC<TaskPriorityDisplayProps> = ({ priority }) => {
  return <p className={priorityStyles[priority]}>{priority}</p>;
};

export default TaskPriorityDisplay;
