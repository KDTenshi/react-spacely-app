import type { FC, InputHTMLAttributes } from "react";
import style from "./Input.module.scss";
import type { ListUnion } from "../../types/types";

type InputSize = "big" | "medium" | "small";
type InputColor = "light" | "dark";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fontSize?: InputSize;
  color?: InputColor;
}

const colorStyles: ListUnion<InputColor> = {
  dark: style.Dark,
  light: style.Light,
};

const sizeStyles: ListUnion<InputSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const Input: FC<InputProps> = ({ fontSize = "medium", color = "light", className = "", type = "text", ...props }) => {
  const inputClassName = [colorStyles[color], sizeStyles[fontSize], className].join(" ");

  return <input className={inputClassName} type={type} {...props} />;
};

export default Input;
