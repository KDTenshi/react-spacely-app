import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import { switchSideMenuStatus } from "../../../store/uiSlice";
import { BlockLink, Icon, Logo } from "../../../shared/ui";

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
        <BlockLink size="medium" to={"/login"}>
          Login
        </BlockLink>
        <BlockLink size="medium" to={"/registration"}>
          Register
        </BlockLink>
      </nav>
    </header>
  );
};

export default Header;
