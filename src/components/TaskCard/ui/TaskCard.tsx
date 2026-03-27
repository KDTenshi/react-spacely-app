import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import { TextItem } from "../../../shared/ui";
import { getDateString } from "../../../shared/utils/getDateString";
import { TaskPriorityDisplay } from "../../TaskPriorityDisplay";
import { setEditingTaskID } from "../../../store/boardsSlice";

interface TaskCardProps {
  taskID: string;
  boardID: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskID, boardID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });

  const task = useAppSelector((state) => state.boards.list[boardID].tasksList[taskID]);

  const dispatch = useAppDispatch();

  return (
    <div
      className={style.Task}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      onClick={() => dispatch(setEditingTaskID(taskID))}
    >
      <TextItem color="black">{task.name}</TextItem>
      <TaskPriorityDisplay priority={task.priority} />
      <TextItem size="medium">Created at: {getDateString(task.createdAt)}</TextItem>
    </div>
  );
};

export default TaskCard;
