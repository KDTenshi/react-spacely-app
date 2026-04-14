import { useEffect, type FC } from "react";
import style from "./EditBoardPage.module.scss";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { BlockLink, Heading } from "../../../shared/ui";
import { clearSelectedBoardID, setSelectedBoardID } from "../../../features/Tasks/store/tasksSlice";
import { EditBoard } from "../../../features/Tasks/components/EditBoard";
import { Page } from "../../Page";

const EditBoardPage: FC = () => {
  const { boardID } = useParams();
  const board = useAppSelector((state) => (boardID ? state.tasks.boardsList[boardID] : null));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) {
      dispatch(setSelectedBoardID(board.id));
    }

    return () => {
      dispatch(clearSelectedBoardID());
    };
  }, [board, dispatch]);

  if (!board) return null;

  return (
    <Page title={`EDIT ${board.name}`} className={style.Edit} background="image">
      <div className={style.Header}>
        <Heading level={4}>Edit board</Heading>
        <BlockLink to={`/boards/${board.id}`} size="medium">
          To board
        </BlockLink>
      </div>
      <div className={style.Content}>
        <EditBoard board={board} />
      </div>
    </Page>
  );
};

export default EditBoardPage;
