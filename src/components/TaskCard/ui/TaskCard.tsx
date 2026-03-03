import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { deleteTask } from "../../../shared/store/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";

interface TaskCardProps {
  taskID: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.tasksList[taskID]);

  const dispatch = useAppDispatch();

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef}>
      {task.name}
      <button onClick={() => dispatch(deleteTask({ taskID }))}>Delete</button>
    </div>
  );
};

export default TaskCard;
