import type { FC } from "react";
import style from "./BoardsList.module.scss";
import { useAppSelector } from "../../../../../app/store/appStore";
import { BlockLink, Icon, TextItem } from "../../../../../shared/ui";
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
  const boardsOrder = useAppSelector((state) => state.tasks.boardsOrder);
  const boards = useAppSelector((state) => state.tasks.boardsByID);

  console.log(boards);

  return (
    <>
      {display === "banner" && boardsOrder.length === 0 && (
        <TextItem size="big" align="center">
          No boards here
        </TextItem>
      )}
      <nav className={displayStyles[display]}>
        {boardsOrder.map((boardID) => (
          <BlockLink to={`/boards/${boardID}`} key={boardID} size={display === "compact" ? "medium" : "big"}>
            <Icon icon="view_kanban" size={display === "compact" ? "small" : "medium"} />
            {boards[boardID].name}
          </BlockLink>
        ))}
      </nav>
    </>
  );
};

export default BoardsList;
