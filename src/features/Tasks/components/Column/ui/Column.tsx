import type { FC } from "react";
import style from "./Column.module.scss";
import type { ListUnion, TColumnType } from "../../../../../shared/types/types";
import { Heading, TextItem } from "../../../../../shared/ui";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "../../Card";

interface ColumnProps {
  columnType: TColumnType;
  tasksIDs: string[];
}

const columnTitles: ListUnion<TColumnType> = {
  todo: "To Do",
  doing: "In Progress",
  done: "Done",
};

const Column: FC<ColumnProps> = ({ columnType, tasksIDs }) => {
  const { setNodeRef } = useSortable({ id: columnType, data: { type: "column" } });

  return (
    <div className={style.Column} ref={setNodeRef}>
      <Heading level={4}>{columnTitles[columnType]}</Heading>
      <div className={style.List}>
        {tasksIDs.length === 0 && (
          <TextItem size="medium" align="center">
            No tasks here
          </TextItem>
        )}
        {tasksIDs.map((taskID) => (
          <Card taskID={taskID} key={taskID} />
        ))}
      </div>
    </div>
  );
};

export default Column;
