import type { FC } from "react";
import style from "./Header.module.scss";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { switchSideMenuStatus } from "../../../store/uiSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={style.Header}>
      <div className={style.Logo} onClick={() => dispatch(switchSideMenuStatus())}>
        Space<span>ly</span>
      </div>
      <div className={style.Buttons}>
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </header>
  );
};

export default Header;
