import { useEffect, useState, type FC } from "react";
import style from "./CreateBoardPage.module.scss";
import { Button, Heading, Input } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { useNavigate } from "react-router";
import { createBoard } from "../../../store/boardsSlice";

const CreateBoardPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    document.title = "Create New Board";
  }, []);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = boardName.trim();

    if (name) {
      dispatch(createBoard({ name }));
      navigate("/boards");
    }
  };

  return (
    <div className={style.CreateBoard}>
      <div className={style.Content}>
        <Heading level={3}>Create new board</Heading>
        <form className={style.Form} onSubmit={handleSubmit}>
          <Input placeholder="Board name..." value={boardName} onChange={(e) => setBoardName(e.target.value)} />
          <Button type="submit" className={style.Button}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardPage;
