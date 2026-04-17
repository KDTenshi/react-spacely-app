import { useState, type FC } from "react";
import style from "./BoardInfo.module.scss";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { editBoard } from "../../../store/tasksSlice";
import { Button, Heading, Icon, Input } from "../../../../../shared/ui";

interface BoardInfoProps {
  boardName: string;
}

const BoardInfo: FC<BoardInfoProps> = ({ boardName }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [editName, setEditName] = useState(boardName);

  const dispatch = useAppDispatch();

  const handleEditName = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = editName.trim();

    if (name) {
      dispatch(editBoard({ name }));
    }

    setIsEditName(false);
  };

  const handleEditNameBlur = () => {
    const name = editName.trim();

    if (name !== boardName) {
      dispatch(editBoard({ name }));
    }

    setIsEditName(false);
  };
  return (
    <div className={style.Info}>
      {!isEditName && (
        <Heading level={4}>
          <Icon icon="view_kanban" size="medium" />
          {boardName}
        </Heading>
      )}
      {isEditName && (
        <form onSubmit={handleEditName}>
          <Input
            placeholder="Board name"
            value={editName}
            className={style.Input}
            onChange={(e) => setEditName(e.target.value)}
            autoFocus
            onBlur={handleEditNameBlur}
          />
        </form>
      )}
      <Button size="medium" onClick={() => setIsEditName(true)}>
        <Icon icon="edit_square" size="small" />
        Edit name
      </Button>
    </div>
  );
};

export default BoardInfo;
