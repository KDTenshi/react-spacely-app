import type { FC } from "react";
import style from "./SideMenu.module.scss";
import { BlockLink, Heading, Icon } from "../../../../../shared/ui";
import { useAppSelector } from "../../../../../app/store/appStore";
import { BoardsList } from "../../../../Tasks/components/BoardsList";

const SideMenu: FC = () => {
  const isShown = useAppSelector((state) => state.layout.isSideMenuShown);

  const menuClassName = isShown ? style.Shown : style.Hidden;

  return (
    <div className={menuClassName}>
      <Heading level={4}>Navigation</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/"}>
          <Icon icon="home" size="medium" />
          Home
        </BlockLink>
        <BlockLink to={"/boards"}>
          <Icon icon="view_kanban" size="medium" />
          Boards
        </BlockLink>
      </nav>
      <Heading level={4}>Your boards</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/create"} size="medium">
          <Icon icon="add" size="small" />
          Create new board
        </BlockLink>
        <BoardsList />
      </nav>
    </div>
  );
};

export default SideMenu;
