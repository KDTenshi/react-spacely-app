import { useEffect, type FC } from "react";
import style from "./EditBoardPage.module.scss";
import { useParams } from "react-router";
import { BlockLink, Heading } from "../../../shared/ui";
import { EditBoard } from "../../../components/EditBoard";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { clearSelectedBoardID, setSelectedBoardID } from "../../../store/boardsSlice";

const EditBoardPage: FC = () => {
  const { boardID } = useParams();
  const board = useAppSelector((state) => (boardID ? state.boards.list[boardID] : null));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) dispatch(setSelectedBoardID(board.id));

    return () => {
      dispatch(clearSelectedBoardID());
    };
  }, [board, dispatch]);

  if (!board) return null;

  return (
    <div className={style.EditBoard}>
      <div className={style.Heading}>
        <BlockLink to={`/boards/${boardID}`}>Go back</BlockLink>
        <Heading level={4}>Edit board</Heading>
      </div>
      <EditBoard board={board} />
    </div>
  );
};

export default EditBoardPage;
