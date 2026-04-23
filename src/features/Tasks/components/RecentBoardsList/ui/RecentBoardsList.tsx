import type { FC } from "react";
import style from "./RecentBoardsList.module.scss";
import { Heading, TextItem } from "../../../../../shared/ui";
import { useAppSelector } from "../../../../../app/store/appStore";
import { BoardLink } from "../../BoardLink";

const RecentBoardsList: FC = () => {
  const recentBoardsIDs = useAppSelector((state) => state.tasks.recentBoardsIDs);

  const lastRecentBoardsIDs = recentBoardsIDs.slice(0, 4);

  return (
    <div className={style.List}>
      <Heading level={4}>Recent boards</Heading>
      {recentBoardsIDs.length === 0 && (
        <TextItem size="medium" align="center">
          No recently visited boards
        </TextItem>
      )}
      {recentBoardsIDs.length !== 0 && (
        <nav className={style.Links}>
          {lastRecentBoardsIDs.map((boardID) => (
            <BoardLink boardID={boardID} key={boardID} />
          ))}
        </nav>
      )}
    </div>
  );
};

export default RecentBoardsList;
