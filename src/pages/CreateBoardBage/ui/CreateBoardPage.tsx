import type { FC } from "react";
import style from "./CreateBoardPage.module.scss";
import { Heading } from "../../../shared/ui";
import { Page } from "../../Page";
import { CreateBoardForm } from "../../../features/Tasks/components/CreateBoardForm";

const CreateBoardPage: FC = () => {
  return (
    <Page title="CREATE BOARD" className={style.Create} background="image">
      <div className={style.Content}>
        <Heading level={3}>Create new board</Heading>
        <CreateBoardForm />
      </div>
    </Page>
  );
};

export default CreateBoardPage;
