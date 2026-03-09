import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { deleteTask, setEditingTaskID } from "../../../shared/store/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { Button, TextItem } from "../../../shared/ui";

interface TaskCardProps {
  taskID: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });

  const task = useAppSelector((state) => state.tasks.tasksList[taskID]);

  const dispatch = useAppDispatch();

  return (
    <div
      className={style.Task}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      onClick={() => dispatch(setEditingTaskID({ taskID: task.id }))}
    >
      <TextItem>{task.name}</TextItem>
      <Button onClick={() => dispatch(deleteTask({ taskID }))}>Delete</Button>
    </div>
  );
};

export default TaskCard;
