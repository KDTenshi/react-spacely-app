import type { FC } from "react";
import type { TColumnType } from "../../../shared/types/types";
import style from "./Column.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import { TaskCard } from "../../TaskCard";
import { useSortable } from "@dnd-kit/sortable";

interface ColumnProps {
  type: TColumnType;
}

const Column: FC<ColumnProps> = ({ type }) => {
  const { setNodeRef } = useSortable({ id: type, data: { type: "column" } });
  const taskIDs = useAppSelector((state) => state.tasks.columns[type]);

  return (
    <div className={style.Column} ref={setNodeRef}>
      <p>{type}</p>
      <div className={style.List}>
        {taskIDs.length === 0 && <p>No tasks</p>}
        {taskIDs.map((taskID) => (
          <TaskCard taskID={taskID} key={taskID} />
        ))}
      </div>
    </div>
  );
};

export default Column;
