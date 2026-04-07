import type { FC } from "react";
import style from "./BoardsPage.module.scss";
import { Heading } from "../../../shared/ui";
import { Page } from "../../Page";

const BoardsPage: FC = () => {
  return (
    <Page title="BOARDS" className={style.Boards} background="image">
      <Heading level={1}>Boards page</Heading>
    </Page>
  );
};

export default BoardsPage;
