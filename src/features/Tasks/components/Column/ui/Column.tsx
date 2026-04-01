import type { FC } from "react";
import style from "./Column.module.scss";
import type { TColumnType } from "../../../../../shared/types/types";

interface ColumnProps {
  columnType: TColumnType;
}

const Column: FC<ColumnProps> = ({ columnType }) => {
  return <div className={style.Column}>{columnType}</div>;
};

export default Column;
