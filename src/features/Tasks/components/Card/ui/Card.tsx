import type { FC } from "react";
import style from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import { TextItem } from "../../../../../shared/ui";
import { getDateString } from "../../../../../shared/utils/getDateString";
import { setEditingTaskID } from "../../../store/tasksSlice";
import { PriorityDisplay } from "../../PriorityDisplay";

interface CardProps {
  taskID: string;
}

const Card: FC<CardProps> = ({ taskID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });

  const task = useAppSelector((state) => state.tasks.tasksByID[taskID]);

  const dispatch = useAppDispatch();

  return (
    <div
      className={style.Card}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      onClick={() => dispatch(setEditingTaskID(taskID))}
    >
      <TextItem color="black">{task.name}</TextItem>
      <PriorityDisplay priority={task.priority} />
      <TextItem size="medium">Created at: {getDateString(task.createdAt)}</TextItem>
    </div>
  );
};

export default Card;
