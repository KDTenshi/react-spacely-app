import type { FC } from "react";
import style from "./Column.module.scss";
import type { ListUnion, TColumnType } from "../../../../../shared/types/types";
import { Heading, TextItem } from "../../../../../shared/ui";

interface ColumnProps {
  columnType: TColumnType;
}

const columnTitles: ListUnion<TColumnType> = {
  todo: "To Do",
  doing: "In Progress",
  done: "Done",
};

const Column: FC<ColumnProps> = ({ columnType }) => {
  return (
    <div className={style.Column}>
      <Heading level={4}>{columnTitles[columnType]}</Heading>
      <div className={style.List}>
        <TextItem size="medium" align="center">
          No tasks here
        </TextItem>
      </div>
    </div>
  );
};

export default Column;
