import type { FC, PropsWithChildren } from "react";
import type { ListUnion } from "../../types/types";
import style from "./TextItem.module.scss";

type TextItemColor = "black" | "dark" | "light" | "white";
type TextItemAlign = "left" | "center" | "right";
type TextItemSize = "big" | "medium" | "small";

interface TextItemProps {
  color?: TextItemColor;
  align?: TextItemAlign;
  size?: TextItemSize;
}

const colorStyles: ListUnion<TextItemColor> = {
  black: style.Black,
  dark: style.Dark,
  light: style.Light,
  white: style.White,
};

const sizeStyles: ListUnion<TextItemSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const alignStyles: ListUnion<TextItemAlign> = {
  left: style.Left,
  center: style.Center,
  right: style.Right,
};

const TextItem: FC<PropsWithChildren<TextItemProps>> = ({ size = "big", color = "dark", align = "left", children }) => {
  const className = [colorStyles[color], sizeStyles[size], alignStyles[align]].join(" ");

  return <p className={className}>{children}</p>;
};

export default TextItem;
