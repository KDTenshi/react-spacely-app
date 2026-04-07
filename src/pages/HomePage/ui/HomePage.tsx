import type { FC } from "react";
import style from "./HomePage.module.scss";
import { Heading } from "../../../shared/ui";
import { Page } from "../../Page";

const HomePage: FC = () => {
  return (
    <Page title="HOME" className={style.Home} background="image">
      <Heading level={1}>Home page</Heading>
    </Page>
  );
};

export default HomePage;
