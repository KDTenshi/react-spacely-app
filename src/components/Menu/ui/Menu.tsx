import type { FC } from "react";
import style from "./Menu.module.scss";
import { BlockLink, Heading } from "../../../shared/ui";
import { useAppSelector } from "../../../app/store/appStore";

const Menu: FC = () => {
  const isMenuShown = useAppSelector((state) => state.ui.isSideMenuShown);
  const boards = useAppSelector((state) => state.tasks.boards);

  const className = isMenuShown ? style.Shown : style.Hidden;

  const boardsArray = Object.values(boards);

  return (
    <div className={className}>
      <Heading level={4}>Navigation</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/"}>Home</BlockLink>
        <BlockLink to={"/"}>Boards</BlockLink>
      </nav>
      <Heading level={4}>Your boards</Heading>
      <nav className={style.Links}>
        <BlockLink to={"/create"} size="medium">
          Create new board
        </BlockLink>
        {boardsArray.map((board) => (
          <BlockLink to={`/boards/${board.id}`} size="medium" key={board.id}>
            {board.name}
          </BlockLink>
        ))}
      </nav>
    </div>
  );
};

export default Menu;
