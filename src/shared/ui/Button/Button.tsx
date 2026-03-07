import type { ButtonHTMLAttributes, FC } from "react";
import style from "./Button.module.scss";
import type { ListUnion } from "../../types/types";

type ButtonColor = "dark" | "light";
type ButtonSize = "big" | "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
}

const colorStyles: ListUnion<ButtonColor> = {
  dark: style.Dark,
  light: style.Light,
};

const sizeStyles: ListUnion<ButtonSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const Button: FC<ButtonProps> = ({
  color = "light",
  size = "medium",
  className = "",
  type = "button",
  children,
  ...props
}) => {
  const buttonClassName = [colorStyles[color], sizeStyles[size], className].join(" ");

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
