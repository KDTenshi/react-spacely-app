import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import { switchSideMenuStatus } from "../../../store/uiSlice";
import { BlockLink } from "../../../shared/ui";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={style.Header}>
      <div className={style.Logo} onClick={() => dispatch(switchSideMenuStatus())}>
        Space<span>ly</span>
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
