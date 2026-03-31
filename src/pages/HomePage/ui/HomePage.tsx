import { useEffect, type FC } from "react";
import style from "./HomePage.module.scss";
import { Heading } from "../../../shared/ui";

const HomePage: FC = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);

  return (
    <div className={style.Home}>
      <Heading level={1}>Home page</Heading>
    </div>
  );
};

export default HomePage;
