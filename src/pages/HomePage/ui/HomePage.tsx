import type { FC } from "react";
import style from "./HomePage.module.scss";
import { Page } from "../../Page";
import { WelcomeBanner } from "../../../features/Layout/components/WelcomeBanner";
import { RecentBoardsList } from "../../../features/Tasks/components/RecentBoardsList";

const HomePage: FC = () => {
  return (
    <Page title="HOME" className={style.Home} background="image">
      <WelcomeBanner />
      <div className={style.Container}>
        <RecentBoardsList />
      </div>
    </Page>
  );
};

export default HomePage;
