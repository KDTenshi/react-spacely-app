import type { FC } from "react";
import style from "./PriorityDisplay.module.scss";
import type { ListUnion, TTaskPriority } from "../../../../../shared/types/types";

interface PriorityDisplayProps {
  priority: TTaskPriority;
}

const priorityStyles: ListUnion<TTaskPriority> = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const PriorityDisplay: FC<PriorityDisplayProps> = ({ priority }) => {
  return <p className={priorityStyles[priority]}>{priority}</p>;
};

export default PriorityDisplay;
