import type { FC } from "react";
import style from "./SideMenu.module.scss";
import { BlockLink, Heading } from "../../../../../shared/ui";
import { useAppSelector } from "../../../../../app/store/appStore";

const SideMenu: FC = () => {
  const isShown = useAppSelector((state) => state.layout.isSideMenuShown);

  const menuClassName = isShown ? style.Shown : style.Hidden;

  return (
    <div className={menuClassName}>
      <Heading level={4}>Navigation</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/"}>Home</BlockLink>
        <BlockLink to={"/boards"}>Boards</BlockLink>
      </nav>
      <Heading level={4}>Your boards</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/create"} size="medium">
          Create new board
        </BlockLink>
      </nav>
    </div>
  );
};

export default SideMenu;
