import type { FC } from "react";
import style from "./ConfrimPopup.module.scss";
import { Button, Heading } from "../../../../../shared/ui";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  hidePopup: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ message, onConfirm, hidePopup }) => {
  return (
    <div className={style.Wrapper} onClick={hidePopup}>
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
