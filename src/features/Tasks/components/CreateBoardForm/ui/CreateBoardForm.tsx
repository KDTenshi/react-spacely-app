import { useState, type FC } from "react";
import style from "./CreateBoardForm.module.scss";
import { Button, Input } from "../../../../../shared/ui";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { useNavigate } from "react-router";
import { createBoard } from "../../../store/tasksSlice";

const CreateBoardForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = boardName.trim();

    if (name) {
      dispatch(createBoard({ name }));
      navigate("/boards");
    }
  };
  return (
    <form className={style.Form} onSubmit={handleSubmit}>
      <Input placeholder="Board name..." value={boardName} onChange={(e) => setBoardName(e.target.value)} autoFocus />
      <Button type="submit" className={style.Button}>
        Confirm
      </Button>
    </form>
  );
};

export default CreateBoardForm;
