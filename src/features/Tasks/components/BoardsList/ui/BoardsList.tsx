import type { FC } from "react";
import style from "./BoardsList.module.scss";
import { useAppSelector } from "../../../../../app/store/appStore";
import { BlockLink } from "../../../../../shared/ui";

const BoardsList: FC = () => {
  const boards = useAppSelector((state) => state.tasks.boardsList);
  const boardsArray = Object.values(boards);

  return (
    <nav className={style.Boards}>
      {boardsArray.map((board) => (
        <BlockLink to={`/boards/${board.id}`} key={board.id} size="medium">
          {board.name}
        </BlockLink>
      ))}
    </nav>
  );
};

export default BoardsList;
