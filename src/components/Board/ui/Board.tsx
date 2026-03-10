import { useState, type FC } from "react";
import style from "./Board.module.scss";
import { Column } from "../../Column";
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
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import {
  addTask,
  changeTaskColumn,
  changeTaskPosition,
  clearSelectedTaskID,
  setSelectedTaskID,
} from "../../../shared/store/tasksSlice";
import type { TColumnType } from "../../../shared/types/types";
import { TaskCard } from "../../TaskCard";
import { Button, Heading, Input } from "../../../shared/ui";
import { TaskPanel } from "../../TaskPanel";

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  const columns = useAppSelector((state) => state.tasks.columns);
  const columnsTypes = Object.keys(columns) as TColumnType[];

  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.SubmitEvent) => {
    e.preventDefault();

    const name = taskName.trim();

    if (name) {
      dispatch(addTask({ name }));
      setTaskName("");
    }
  };

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setSelectedTaskID({ taskID }));
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
    dispatch(clearSelectedTaskID());
  };

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const sensors = useSensors(mouseSensor);

  return (
    <div className={style.Board}>
      <div className={style.Header}>
        <div className={style.Title}>
          <Heading level={3}>Project title</Heading>
        </div>
        <form className={style.Form} onSubmit={handleAddTask}>
          <Input
            className={style.Input}
            placeholder="Task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Button>Add task</Button>
        </form>
      </div>
      <div className={style.Columns}>
        <TaskPanel />
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={pointerWithin}
        >
          {columnsTypes.map((columnType) => (
            <Column type={columnType} key={columnType} />
          ))}
          {selectedTaskID && (
            <DragOverlay>
              <TaskCard taskID={selectedTaskID} />
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
