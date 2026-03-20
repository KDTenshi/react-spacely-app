import type { FC } from "react";
import style from "./Menu.module.scss";
import { BlockLink, Heading, TextItem } from "../../../shared/ui";
import { useAppSelector } from "../../../app/store/appStore";

const Menu: FC = () => {
  const isMenuShown = useAppSelector((state) => state.ui.isSideMenuShown);

  const className = isMenuShown ? style.Shown : style.Hidden;

  return (
    <div className={className}>
      <Heading level={4}>Navigation</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/"}>Home</BlockLink>
        <BlockLink to={"/"}>Boards</BlockLink>
      </nav>
      <Heading level={4}>Your boards</Heading>
      <nav className={style.Links}>
        <TextItem size="medium" align="center">
          No boards here
        </TextItem>
        <BlockLink to={"/board"} size="medium">
          Project name
        </BlockLink>
        <BlockLink to={"/board"} size="medium">
          Project name
        </BlockLink>
        <BlockLink to={"/board"} size="medium">
          Project name
        </BlockLink>
      </nav>
    </div>
  );
};

export default Menu;
