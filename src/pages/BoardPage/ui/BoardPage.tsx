import type { FC } from "react";
import style from "./BoardPage.module.scss";
import { useParams } from "react-router";
import { Board } from "../../../components/Board";

const BoardPage: FC = () => {
  const { boardID } = useParams();

  if (!boardID) return;

  return (
    <div className={style.BoardPage}>
      <Board boardID={boardID} />
    </div>
  );
};

export default BoardPage;
