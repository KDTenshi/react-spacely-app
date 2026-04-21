import { useEffect, useState, type FC } from "react";
import style from "./BoardInfo.module.scss";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { deleteBoard, editBoard } from "../../../store/tasksSlice";
import { Button, ConfirmPopup, Heading, Icon, Input } from "../../../../../shared/ui";
import { useNavigate } from "react-router";

interface BoardInfoProps {
  boardName: string;
  boardID: string;
}

const BoardInfo: FC<BoardInfoProps> = ({ boardName, boardID }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [editName, setEditName] = useState(boardName);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEditName(boardName);
  }, [boardName]);

  const dispatch = useAppDispatch();

  const handleEditName = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = editName.trim();

    if (name) {
      dispatch(editBoard({ name, boardID }));
    }

    setIsEditName(false);
  };

  const handleEditNameBlur = () => {
    const name = editName.trim();

    if (name !== boardName) {
      dispatch(editBoard({ name, boardID }));
    }

    setIsEditName(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isEditName) {
      const name = editName.trim();

      if (name) {
        dispatch(editBoard({ name, boardID }));
      }

      setIsEditName(false);
    } else {
      setIsEditName(true);
    }
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ boardID }));
    navigate("/boards", { replace: true });
  };

  return (
    <div className={style.Info}>
      {isDelete && (
        <ConfirmPopup message="Delete board?" onConfirm={handleDeleteBoard} hidePopup={() => setIsDelete(false)} />
      )}
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
      <div className={style.Buttons}>
        <Button size="medium" onMouseDown={handleButtonClick}>
          <Icon icon="edit_square" size="small" />
          {isEditName ? "Confirm" : "Edit name"}
        </Button>
        <Button size="medium" onClick={() => setIsDelete(true)}>
          <Icon icon="delete" size="small" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BoardInfo;
