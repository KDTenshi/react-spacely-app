import { useState, type FC } from "react";
import style from "./Board.module.scss";
import type { TBoard, TColumnType } from "../../../../../shared/types/types";
import { Heading, BlockLink, Input, Button } from "../../../../../shared/ui";
import { Column } from "../../Column";
import { Panel } from "../../Panel";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import {
  changeTaskColumn,
  changeTaskPosition,
  clearDraggingTaskID,
  createTask,
  setDraggingTaskID,
} from "../../../store/tasksSlice";
import { Card } from "../../Card";

interface BoardProps {
  board: TBoard;
}

const Board: FC<BoardProps> = ({ board }) => {
  const columns = Object.keys(board.columns) as TColumnType[];

  const draggingTaskID = useAppSelector((state) => state.tasks.draggingTaskID);

  const [taskName, setTaskName] = useState("");

  const dispatch = useAppDispatch();

  const handleAddTask = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = taskName.trim();

    if (name) {
      dispatch(createTask({ name }));
      setTaskName("");
    }
  };

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const activeID = e.active.id as string;

    dispatch(setDraggingTaskID(activeID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const active = e.active;
    const over = e.over;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const activeType = activeData.type;
    const overType = overData.type;

    if (activeType === overType) {
      const activeTaskID = active.id as string;
      const overTaskID = over.id as string;

      if (activeTaskID === overTaskID) return;

      dispatch(changeTaskPosition({ activeTaskID, overTaskID }));
    }

    if (activeType !== overType) {
      const taskID = active.id as string;
      const column = over.id as TColumnType;

      dispatch(changeTaskColumn({ taskID, column }));
    }
  };

  const handleDragEnd = () => {
    dispatch(clearDraggingTaskID());
  };

  return (
    <div className={style.Board}>
      <div className={style.Head}>
        <div className={style.Info}>
          <Heading level={4}>Board name</Heading>
          <BlockLink to={"edit"} size="medium">
            Edit
          </BlockLink>
        </div>
        <div className={style.Form} onSubmit={handleAddTask}>
          <form className={style.AddTask}>
            <Input
              placeholder="Task name..."
              className={style.Input}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Button type="submit">Add task</Button>
          </form>
        </div>
      </div>
      <div className={style.Body}>
        <Panel />
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <Column columnType={column} key={column} />
          ))}
          {draggingTaskID && (
            <DragOverlay>
              <Card taskID={draggingTaskID} />
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
