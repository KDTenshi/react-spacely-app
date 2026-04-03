import type { FC } from "react";
import style from "./Board.module.scss";
import type { TBoard, TColumnType } from "../../../../../shared/types/types";
import { Heading, BlockLink, Input, Button } from "../../../../../shared/ui";
import { Column } from "../../Column";
import { Panel } from "../../Panel";

interface BoardProps {
  board: TBoard;
}

const Board: FC<BoardProps> = ({ board }) => {
  const columns = Object.keys(board.columns) as TColumnType[];

  return (
    <div className={style.Board}>
      <div className={style.Head}>
        <div className={style.Info}>
          <Heading level={4}>Board name</Heading>
          <BlockLink to={"edit"} size="medium">
            Edit
          </BlockLink>
        </div>
        <div className={style.Form}>
          <form className={style.AddTask}>
            <Input placeholder="Task name..." className={style.Input} />
            <Button type="submit">Add task</Button>
          </form>
        </div>
      </div>
      <div className={style.Body}>
        <Panel />
        {columns.map((column) => (
          <Column columnType={column} key={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
