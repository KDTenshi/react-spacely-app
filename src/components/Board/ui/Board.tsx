import type { FC } from "react";
import style from "./Board.module.scss";
import { Column } from "../../Column";
import { DndContext, MouseSensor, useSensor, useSensors, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { changeTaskColumn, changeTaskPosition } from "../../../shared/store/tasksSlice";
import type { TColumnType } from "../../../shared/types/types";

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const columns = useAppSelector((state) => state.tasks.columns);
  const columnsTypes = Object.keys(columns) as TColumnType[];

  const handleDragStart = (e: DragStartEvent) => {
    console.log(`Dragging: ${e.active.id}`);
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
    console.log("No drag");
  };

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const sensors = useSensors(mouseSensor);

  return (
    <div className={style.Board}>
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
        {columnsTypes.map((columnType) => (
          <Column type={columnType} key={columnType} />
        ))}
      </DndContext>
    </div>
  );
};

export default Board;
