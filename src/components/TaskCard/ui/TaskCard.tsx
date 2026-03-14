import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { setEditingTaskID } from "../../../shared/store/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { TextItem } from "../../../shared/ui";
import { getDateString } from "../../../shared/utils/getDateString";
import { TaskPriorityDisplay } from "../../TaskPriorityDisplay";

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
      <TextItem color="black">{task.name}</TextItem>
      <TaskPriorityDisplay priority={task.priority} />
      <TextItem size="medium">Created at: {getDateString(task.createdAt)}</TextItem>
    </div>
  );
};

export default TaskCard;
