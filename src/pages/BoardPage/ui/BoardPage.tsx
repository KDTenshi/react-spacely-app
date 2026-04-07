import style from "./BoardPage.module.scss";
import { useNavigate, useParams } from "react-router";
import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Board } from "../../../features/Tasks/components/Board";
import { clearSelectedBoardID, setSelectedBoardID } from "../../../features/Tasks/store/tasksSlice";
import { Page } from "../../Page";

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

    dispatch(setSelectedBoardID(board.id));

    return () => {
      dispatch(clearSelectedBoardID());
    };
  }, [board, dispatch, navigate]);

  if (!board) return null;

  return (
    <Page title={board.name} className={style.Board}>
      <Board board={board} />
    </Page>
  );
};

export default BoardPage;
