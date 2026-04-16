import type { FC } from "react";
import style from "./Icon.module.scss";
import type { ListUnion } from "../../types/types";

type IconType = "add" | "delete" | "edit_square" | "home" | "menu" | "view_kanban";
type IconSize = "big" | "medium" | "small";

interface IconProps {
  icon: IconType;
  size?: IconSize;
}

const sizeStyles: ListUnion<IconSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const Icon: FC<IconProps> = ({ icon, size = "big" }) => {
  const iconClassName = [sizeStyles[size], "material-symbols-outlined"].join(" ");

  return <span className={iconClassName}>{icon}</span>;
};

export default Icon;
