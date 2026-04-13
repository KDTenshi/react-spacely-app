import type { FC } from "react";
import style from "./BoardsPage.module.scss";
import { BlockLink, Heading } from "../../../shared/ui";
import { Page } from "../../Page";
import { BoardsList } from "../../../features/Tasks/components/BoardsList";

const BoardsPage: FC = () => {
  return (
    <Page title="BOARDS" className={style.Boards} background="image">
      <div className={style.List}>
        <div className={style.Heading}>
          <Heading level={3}>Your boards</Heading>
          <BlockLink to={"/create"}>Create board</BlockLink>
        </div>
        <BoardsList display="banner" />
      </div>
    </Page>
  );
};

export default BoardsPage;
