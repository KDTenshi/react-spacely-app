import type { FC } from "react";
import style from "./PriorityButton.module.scss";
import type { ListUnion, TTaskPriority } from "../../../../../shared/types/types";

interface PriorityButtonProps {
  priority: TTaskPriority;
  isActive: boolean;
  setActive: () => void;
}

const priorityStyles: ListUnion<TTaskPriority> = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const PriorityButton: FC<PriorityButtonProps> = ({ priority, isActive, setActive }) => {
  const className = isActive ? [priorityStyles[priority], style.Active].join(" ") : priorityStyles[priority];

  return (
    <button className={className} onClick={setActive} type="button">
      {priority}
    </button>
  );
};

export default PriorityButton;
