import type { FC } from "react";
import style from "./Column.module.scss";
import type { ListUnion, TColumnType } from "../../../../../shared/types/types";
import { Heading, TextItem } from "../../../../../shared/ui";
import { useSortable } from "@dnd-kit/sortable";
import { useAppSelector } from "../../../../../app/store/appStore";
import { Card } from "../../Card";

interface ColumnProps {
  columnType: TColumnType;
}

const columnTitles: ListUnion<TColumnType> = {
  todo: "To Do",
  doing: "In Progress",
  done: "Done",
};

const Column: FC<ColumnProps> = ({ columnType }) => {
  const { setNodeRef } = useSortable({ id: columnType, data: { type: "column" } });

  const taskIDs = useAppSelector((state) =>
    state.tasks.selectedBoardID ? state.tasks.boardsList[state.tasks.selectedBoardID].columns[columnType] : null,
  );

  if (!taskIDs) return null;

  return (
    <div className={style.Column} ref={setNodeRef}>
      <Heading level={4}>{columnTitles[columnType]}</Heading>
      <div className={style.List}>
        {taskIDs.length === 0 && (
          <TextItem size="medium" align="center">
            No tasks here
          </TextItem>
        )}
        {taskIDs.map((taskID) => (
          <Card taskID={taskID} key={taskID} />
        ))}
      </div>
    </div>
  );
};

export default Column;
