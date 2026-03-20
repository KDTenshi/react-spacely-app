import type { FC } from "react";
import style from "./BlockLink.module.scss";
import { Link, type LinkProps } from "react-router";
import type { ListUnion } from "../../types/types";

type BlockLinkSize = "big" | "medium" | "small";
type BlockLinkColor = "dark" | "light";

interface BlockLinkProps extends LinkProps {
  size?: BlockLinkSize;
  color?: BlockLinkColor;
}

const sizeStyles: ListUnion<BlockLinkSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const colorStyles: ListUnion<BlockLinkColor> = {
  dark: style.Dark,
  light: style.Light,
};

const BlockLink: FC<BlockLinkProps> = ({ color = "light", size = "big", to, className, children, ...props }) => {
  const blockLinkClassName = [sizeStyles[size], colorStyles[color], className].join(" ");

  return (
    <Link className={blockLinkClassName} to={to} {...props}>
      {children}
    </Link>
  );
};

export default BlockLink;
