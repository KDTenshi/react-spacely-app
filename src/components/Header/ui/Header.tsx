import type { FC } from "react";
import style from "./Header.module.scss";
import { Button } from "../../../shared/ui";

const Header: FC = () => {
  return (
    <header className={style.Header}>
      <div className={style.Logo}>
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
