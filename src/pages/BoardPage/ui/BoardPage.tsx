import style from "./BoardPage.module.scss";
import { Navigate, useParams } from "react-router";
import type { FC } from "react";
import { useAppSelector } from "../../../app/store/appStore";
import { Board } from "../../../features/Tasks/components/Board";
import { Page } from "../../Page";

const BoardPage: FC = () => {
  const { boardID } = useParams();

  const board = useAppSelector((state) => (boardID ? state.tasks.boardsByID[boardID] : null));

  if (!board) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Page title={board.name} className={style.Board}>
      <Board board={board} />
    </Page>
  );
};

export default BoardPage;
