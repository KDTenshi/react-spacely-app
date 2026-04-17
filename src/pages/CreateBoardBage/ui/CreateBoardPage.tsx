import { useState, type FC } from "react";
import style from "./CreateBoardPage.module.scss";
import { Button, Heading, Input } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { useNavigate } from "react-router";
import { createBoard } from "../../../features/Tasks/store/tasksSlice";
import { Page } from "../../Page";

const CreateBoardPage: FC = () => {
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
    <Page title="CREATE BOARD" className={style.Create} background="image">
      <div className={style.Content}>
        <Heading level={3}>Create new board</Heading>
        <form className={style.Form} onSubmit={handleSubmit}>
          <Input
            placeholder="Board name..."
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            autoFocus
          />
          <Button type="submit" className={style.Button}>
            Continue
          </Button>
        </form>
      </div>
    </Page>
  );
};

export default CreateBoardPage;
