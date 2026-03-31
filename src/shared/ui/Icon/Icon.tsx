import type { FC } from "react";
import style from "./Icon.module.scss";

type IconType = "menu";

interface IconProps {
  icon: IconType;
}

const Icon: FC<IconProps> = ({ icon }) => {
  const iconClassName = [style.Icon, "material-symbols-outlined"].join(" ");

  return <span className={iconClassName}>{icon}</span>;
};

export default Icon;
