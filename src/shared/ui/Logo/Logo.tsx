import type { FC } from "react";
import style from "./Logo.module.scss";

const Logo: FC = () => {
  return (
    <div className={style.Logo}>
      Space
      <span>ly</span>
    </div>
  );
};

export default Logo;
