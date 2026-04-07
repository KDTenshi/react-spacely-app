import type { FC } from "react";
import style from "./RegisterPage.module.scss";
import { Heading } from "../../../shared/ui";
import { Page } from "../../Page";

const RegisterPage: FC = () => {
  return (
    <Page title="REGISTRATION" className={style.Register} background="image">
      <Heading level={1}>Register page</Heading>
    </Page>
  );
};

export default RegisterPage;
