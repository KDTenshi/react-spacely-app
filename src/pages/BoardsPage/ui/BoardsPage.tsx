import type { FC } from "react";
import style from "./BoardsPage.module.scss";
import { Heading } from "../../../shared/ui";

const BoardsPage: FC = () => {
  return (
    <div className={style.Boards}>
      <Heading level={1}>Boards page</Heading>
    </div>
  );
};

export default BoardsPage;
