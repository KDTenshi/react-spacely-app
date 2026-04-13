import type { FC } from "react";
import style from "./BoardsList.module.scss";
import { useAppSelector } from "../../../../../app/store/appStore";
import { BlockLink, TextItem } from "../../../../../shared/ui";
import type { ListUnion } from "../../../../../shared/types/types";

type BoardsListDisplay = "compact" | "banner";

interface BoardsListProps {
  display?: BoardsListDisplay;
}

const displayStyles: ListUnion<BoardsListDisplay> = {
  compact: style.Compact,
  banner: style.Banner,
};

const BoardsList: FC<BoardsListProps> = ({ display = "compact" }) => {
  const boards = useAppSelector((state) => state.tasks.boardsList);
  const boardsArray = Object.values(boards);

  return (
    <>
      {display === "banner" && boardsArray.length === 0 && (
        <TextItem size="big" align="center">
          No boards here
        </TextItem>
      )}
      <nav className={displayStyles[display]}>
        {boardsArray.map((board) => (
          <BlockLink to={`/boards/${board.id}`} key={board.id} size={display === "compact" ? "medium" : "big"}>
            {board.name}
          </BlockLink>
        ))}
      </nav>
    </>
  );
};

export default BoardsList;
