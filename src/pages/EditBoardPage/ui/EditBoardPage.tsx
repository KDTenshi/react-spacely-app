import { useEffect, type FC } from "react";
import style from "./EditBoardPage.module.scss";
import { useParams } from "react-router";
import { EditBoard } from "../../../components/EditBoard";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { clearSelectedBoardID, setSelectedBoardID } from "../../../store/boardsSlice";
import { BlockLink, Heading } from "../../../shared/ui";

const EditBoardPage: FC = () => {
  const { boardID } = useParams();
  const board = useAppSelector((state) => (boardID ? state.boards.list[boardID] : null));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) {
      document.title = `Edit ${board.name}`;
      dispatch(setSelectedBoardID(board.id));
    }

    return () => {
      dispatch(clearSelectedBoardID());
    };
  }, [board, dispatch]);

  if (!board) return null;

  return (
    <div className={style.EditBoard}>
      <div className={style.Header}>
        <Heading level={3}>Edit board</Heading>
        <BlockLink to={`/boards/${board.id}`}>To board</BlockLink>
      </div>
      <div className={style.Content}>
        <EditBoard board={board} />
      </div>
    </div>
  );
};

export default EditBoardPage;
