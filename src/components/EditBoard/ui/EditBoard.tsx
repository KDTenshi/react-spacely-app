import { useState, type FC } from "react";
import style from "./EditBoard.module.scss";
import type { TBoard } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteBoard, editBoard } from "../../../store/boardsSlice";
import { Button } from "../../../shared/ui";
import { ConfirmPopup } from "../../ConfirmPopup";
import { useNavigate } from "react-router";

interface EditBoardProps {
  board: TBoard;
}

const EditBoard: FC<EditBoardProps> = ({ board }) => {
  const [boardName, setBoardName] = useState(board.name);
  const [boardDescription, setBoardDescription] = useState(board.description);

  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = boardName.trim();
    const description = boardDescription.trim();

    if (!name) return;

    dispatch(editBoard({ name, description }));
  };

  const handleBoardDelete = () => {
    dispatch(deleteBoard());
    navigate("/", { replace: true });
  };

  return (
    <form className={style.EditBoard} onSubmit={handleSubmit}>
      {isDelete && (
        <ConfirmPopup message="Delete board?" handleConfirm={handleBoardDelete} closePopup={() => setIsDelete(false)} />
      )}
      <Button size="big" className={style.Button} onClick={() => setIsDelete(true)}>
        Delete
      </Button>
      <input
        type="text"
        placeholder="Board name..."
        className={style.Input}
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <textarea
        placeholder="No description..."
        className={style.Textarea}
        value={boardDescription}
        onChange={(e) => setBoardDescription(e.target.value)}
      ></textarea>
      <Button type="submit" size="big" className={style.Button}>
        Edit
      </Button>
    </form>
  );
};

export default EditBoard;
