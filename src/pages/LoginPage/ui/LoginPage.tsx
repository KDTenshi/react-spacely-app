import type { FC } from "react";
import style from "./LoginPage.module.scss";
import { Heading } from "../../../shared/ui";
import { Page } from "../../Page";

const LoginPage: FC = () => {
  return (
    <Page title="LOGIN" className={style.Login} background="image">
      <Heading level={1}>Login page</Heading>
    </Page>
  );
};

export default LoginPage;
