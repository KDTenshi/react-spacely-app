import type { FC } from "react";
import style from "./BoardsList.module.scss";
import { useAppSelector } from "../../../../../app/store/appStore";
import { TextItem } from "../../../../../shared/ui";
import type { ListUnion } from "../../../../../shared/types/types";
import { BoardLink } from "../../BoardLink";

type BoardsListDisplay = "compact" | "banner";

interface BoardsListProps {
  display?: BoardsListDisplay;
}

const displayStyles: ListUnion<BoardsListDisplay> = {
  compact: style.Compact,
  banner: style.Banner,
};

const BoardsList: FC<BoardsListProps> = ({ display = "compact" }) => {
  const boardsOrder = useAppSelector((state) => state.tasks.boardsOrder);

  return (
    <>
      {display === "banner" && boardsOrder.length === 0 && (
        <TextItem size="big" align="center">
          No boards here
        </TextItem>
      )}
      <nav className={displayStyles[display]}>
        {boardsOrder.map((boardID) => (
          <BoardLink boardID={boardID} key={boardID} size={display === "compact" ? "small" : "big"} />
        ))}
      </nav>
    </>
  );
};

export default BoardsList;
