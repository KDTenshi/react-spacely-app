import { useState, type FC } from "react";
import style from "./EditBoard.module.scss";
import type { TBoard } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { editBoard } from "../../../store/boardsSlice";
import { Button } from "../../../shared/ui";

interface EditBoardProps {
  board: TBoard;
}

const EditBoard: FC<EditBoardProps> = ({ board }) => {
  const [boardName, setBoardName] = useState(board.name);
  const [boardDescription, setBoardDescription] = useState(board.description);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = boardName.trim();
    const description = boardDescription.trim();

    if (!name) return;

    dispatch(editBoard({ name, description }));
  };

  return (
    <form className={style.EditBoard} onSubmit={handleSubmit}>
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
      <Button type="submit" className={style.Button}>
        Edit
      </Button>
    </form>
  );
};

export default EditBoard;
