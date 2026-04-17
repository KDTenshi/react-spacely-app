import type { FC } from "react";
import style from "./Board.module.scss";
import type { TBoard, TColumnType } from "../../../../../shared/types/types";
import { Column } from "../../Column";
import { Panel } from "../../Panel";
import { BoardInfo } from "../../BoardInfo";
import { BoardDnd } from "../../BoardDnd";
import { CreateTaskForm } from "../../CreateTaskForm";

interface BoardProps {
  board: TBoard;
}

const Board: FC<BoardProps> = ({ board }) => {
  const columns = Object.keys(board.columns) as TColumnType[];

  return (
    <div className={style.Board}>
      <div className={style.Head}>
        <BoardInfo boardName={board.name} />
        <CreateTaskForm />
      </div>
      <div className={style.Body}>
        <Panel />
        <BoardDnd>
          {columns.map((column) => (
            <Column columnType={column} key={column} />
          ))}
        </BoardDnd>
      </div>
    </div>
  );
};

export default Board;
