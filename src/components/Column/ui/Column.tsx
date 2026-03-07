import type { FC } from "react";
import type { ListUnion, TColumnType } from "../../../shared/types/types";
import style from "./Column.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import { TaskCard } from "../../TaskCard";
import { useSortable } from "@dnd-kit/sortable";
import { Heading, TextItem } from "../../../shared/ui";

interface ColumnProps {
  type: TColumnType;
}

const columnTitles: ListUnion<TColumnType> = {
  todo: "To Do",
  doing: "In Progress",
  done: "Done",
};

const Column: FC<ColumnProps> = ({ type }) => {
  const { setNodeRef } = useSortable({ id: type, data: { type: "column" } });
  const taskIDs = useAppSelector((state) => state.tasks.columns[type]);

  return (
    <div className={style.Column} ref={setNodeRef}>
      <Heading level={4}>{columnTitles[type]}</Heading>
      <div className={style.List}>
        {taskIDs.length === 0 && (
          <TextItem size="medium" align="center">
            No tasks
          </TextItem>
        )}
        {taskIDs.map((taskID) => (
          <TaskCard taskID={taskID} key={taskID} />
        ))}
      </div>
    </div>
  );
};

export default Column;
