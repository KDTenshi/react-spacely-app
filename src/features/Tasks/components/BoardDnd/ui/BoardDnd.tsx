import type { FC, PropsWithChildren } from "react";
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
import type { TColumnType } from "../../../../../shared/types/types";
import {
  setDraggingTaskID,
  changeTaskPosition,
  changeTaskColumn,
  clearDraggingTaskID,
} from "../../../store/tasksSlice";
import { Card } from "../../Card";

const BoardDnd: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const draggingTaskID = useAppSelector((state) => state.tasks.draggingTaskID);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const activeID = e.active.id as string;

    dispatch(setDraggingTaskID(activeID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const activeID = active.id as string;
    const overID = over.id as string;

    if (activeData.type === overData.type) {
      if (activeID === overID) return;

      dispatch(changeTaskPosition({ activeTaskID: activeID, overTaskID: overID }));

      return;
    }

    dispatch(changeTaskColumn({ taskID: activeID, column: overID as TColumnType }));
  };

  const handleDragEnd = () => {
    dispatch(clearDraggingTaskID());
  };

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      {draggingTaskID && (
        <DragOverlay>
          <Card taskID={draggingTaskID} />
        </DragOverlay>
      )}
    </DndContext>
  );
};

export default BoardDnd;
