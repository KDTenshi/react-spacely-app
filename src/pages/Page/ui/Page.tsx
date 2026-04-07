import { useEffect, type FC, type PropsWithChildren } from "react";
import style from "./Page.module.scss";
import type { ListUnion } from "../../../shared/types/types";

type PageBackground = "image" | "color";

interface PageProps {
  title: string;
  background?: PageBackground;
  className?: string;
}

const backgroundStyles: ListUnion<PageBackground> = {
  image: style.Image,
  color: style.Color,
};

const Page: FC<PropsWithChildren<PageProps>> = ({ title, background = "color", children, className }) => {
  const pageClassName = className ? [backgroundStyles[background], className].join(" ") : backgroundStyles[background];

  useEffect(() => {
    document.title = `${title} | SPACELY`;
  }, [title]);

  return <div className={pageClassName}>{children}</div>;
};

export default Page;
