import type { FC } from "react";
import { BlockLink, Icon } from "../../../../../shared/ui";
import { useAppSelector } from "../../../../../app/store/appStore";

type BoardLinkSize = "big" | "small";

interface BoardLinkProps {
  boardID: string;
  size?: BoardLinkSize;
}

const BoardLink: FC<BoardLinkProps> = ({ boardID, size = "small" }) => {
  const board = useAppSelector((state) => state.tasks.boardsByID[boardID]);

  return (
    <BlockLink to={`/boards/${boardID}`} size={size === "big" ? "big" : "medium"}>
      <Icon icon={"view_kanban"} size={size === "big" ? "medium" : "small"} />
      {board.name}
    </BlockLink>
  );
};

export default BoardLink;
