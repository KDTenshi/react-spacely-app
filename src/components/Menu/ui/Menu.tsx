import type { FC } from "react";
import style from "./Menu.module.scss";
import { Heading, TextItem } from "../../../shared/ui";

const Menu: FC = () => {
  return (
    <div className={style.Menu}>
      <Heading level={4}>Your boards</Heading>
      <nav className={style.Boards}>
        <TextItem size="medium" align="center">
          No boards here
        </TextItem>
        <a href="/" className={style.Link}>
          Project title
        </a>
        <a href="/" className={style.Link}>
          Project title
        </a>
        <a href="/" className={style.Link}>
          Project title
        </a>
        <a href="/" className={style.Link}>
          Project title
        </a>
      </nav>
    </div>
  );
};

export default Menu;
