import type { FC } from "react";
import style from "./ConfirmPopup.module.scss";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  hidePopup: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ message, onConfirm, hidePopup }) => {
  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      hidePopup();
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Popup}>
        <Heading level={4}>{message}</Heading>
        <div className={style.Buttons}>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={hidePopup}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
