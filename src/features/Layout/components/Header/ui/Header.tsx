import type { FC } from "react";
import style from "./Header.module.scss";
import { BlockLink, Icon, Logo } from "../../../../../shared/ui";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { switchSideMenuStatus } from "../../../store/layoutSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={style.Header}>
      <div className={style.Logo}>
        <button className={style.Button} onClick={() => dispatch(switchSideMenuStatus())}>
          <Icon icon="menu" />
        </button>
        <Logo />
      </div>
      <nav className={style.Links}>
        <BlockLink to={"/login"} size="medium">
          Login
        </BlockLink>
        <BlockLink to={"/registration"} size="medium">
          Register
        </BlockLink>
      </nav>
    </header>
  );
};

export default Header;
