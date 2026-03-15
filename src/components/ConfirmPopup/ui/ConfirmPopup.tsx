import type { FC } from "react";
import style from "./ConfirmPopup.module.scss";
import { Button, Heading } from "../../../shared/ui";

interface ConfirmPopupProps {
  message: string;
  handleConfirm: () => void;
  closePopup: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ message, handleConfirm, closePopup }) => {
  return (
    <div className={style.Wrapper} onClick={closePopup}>
      <div className={style.Popup}>
        <Heading level={4}>{message}</Heading>
        <div className={style.Buttons}>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={closePopup}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
