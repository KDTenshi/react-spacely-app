import type { FC } from "react";
import style from "./PriorityPicker.module.scss";
import type { TTaskPriority } from "../../../../../shared/types/types";
import { PriorityButton } from "../../PriorityButton";

interface PriorityPickerProps {
  activePriority: TTaskPriority;
  setActivePriority: (arg: TTaskPriority) => void;
}

const PriorityPicker: FC<PriorityPickerProps> = ({ activePriority, setActivePriority }) => {
  return (
    <div className={style.Picker}>
      <PriorityButton priority="low" isActive={activePriority === "low"} setActive={() => setActivePriority("low")} />
      <PriorityButton
        priority="moderate"
        isActive={activePriority === "moderate"}
        setActive={() => setActivePriority("moderate")}
      />
      <PriorityButton
        priority="high"
        isActive={activePriority === "high"}
        setActive={() => setActivePriority("high")}
      />
    </div>
  );
};

export default PriorityPicker;
