import type { FC, PropsWithChildren } from "react";
import type { ListUnion } from "../../types/types";
import style from "./Heading.module.scss";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingColor = "black" | "dark" | "light" | "white";

interface HeadingProps {
  color?: HeadingColor;
  level?: HeadingLevel;
}

const levelStyles: ListUnion<HeadingLevel> = {
  1: style.First,
  2: style.Second,
  3: style.Third,
  4: style.Fourth,
};

const colorStyles: ListUnion<HeadingColor> = {
  black: style.Black,
  dark: style.Dark,
  light: style.Light,
  white: style.White,
};

const Heading: FC<PropsWithChildren<HeadingProps>> = ({ color = "black", level = 1, children }) => {
  const className = [levelStyles[level], colorStyles[color]].join(" ");

  switch (level) {
    case 1: {
      return <h1 className={className}>{children}</h1>;
    }
    case 2: {
      return <h2 className={className}>{children}</h2>;
    }
    case 3: {
      return <h3 className={className}>{children}</h3>;
    }
    case 4: {
      return <h4 className={className}>{children}</h4>;
    }
    default: {
      return <h1 className={className}>{children}</h1>;
    }
  }
};

export default Heading;
