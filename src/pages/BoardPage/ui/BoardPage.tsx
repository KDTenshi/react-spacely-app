import style from "./BoardPage.module.scss";
import { useNavigate, useParams } from "react-router";
import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Board } from "../../../features/Tasks/components/Board";
import { clearSelectedBoardID, setSelectedBoardID } from "../../../features/Tasks/store/tasksSlice";

const BoardPage: FC = () => {
  const { boardID } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => (boardID ? state.tasks.boardsList[boardID] : null));

  useEffect(() => {
    if (!board) {
      navigate("/");
      return;
    }

    document.title = board.name;
    dispatch(setSelectedBoardID(board.id));

    return () => {
      dispatch(clearSelectedBoardID());
    };
  }, [board, dispatch, navigate]);

  if (!board) return null;

  return (
    <div className={style.BoardPage}>
      <Board board={board} />
    </div>
  );
};

export default BoardPage;
