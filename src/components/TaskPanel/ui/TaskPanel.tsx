import style from "./TaskPanel.module.scss";
import { Button, Heading } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useEffect, useState, type FC } from "react";
import { TaskPriorityPicker } from "../../TaskPriorityPicker";
import type { TTaskPriority } from "../../../shared/types/types";
import { ConfirmPopup } from "../../ConfirmPopup";
import { clearEditingTaskID, deleteTask, editTask } from "../../../store/boardsSlice";

type TaskEditData = {
  name: string;
  description: string;
  priority: TTaskPriority;
};

const TaskPanel: FC = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.boards.editingTaskID
      ? state.boards.selectedBoardID
        ? state.boards.list[state.boards.selectedBoardID].tasksList[state.boards.editingTaskID]
        : null
      : null,
  );

  const [taskEditData, setTaskEditData] = useState<TaskEditData>({ name: "", description: "", priority: "low" });
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTaskEditData({ name: task.name, description: task.description, priority: task.priority });
    }
  }, [task]);

  const handleEditTask = () => {
    if (!task) return;

    const name = taskEditData.name.trim();
    const description = taskEditData.description.trim();
    const priority = taskEditData.priority;

    if (name === task.name && description === task.description && priority === task.priority) return;

    if (name) {
      dispatch(editTask({ name, description, priority }));
    }
  };

  const handleWrapperClick = () => {
    handleEditTask();
    dispatch(clearEditingTaskID());
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    handleEditTask();
  };

  return (
    <>
      {isDelete && task && (
        <ConfirmPopup
          message="Delete task?"
          handleConfirm={() => dispatch(deleteTask({ taskID: task.id }))}
          closePopup={() => setIsDelete(false)}
        />
      )}
      <div className={task ? style.Shown : style.Hidden}>
        <Heading level={3}>Task details</Heading>
        {task && (
          <>
            <form className={style.Form} onSubmit={handleSubmit}>
              <Button className={style.Button} onClick={() => setIsDelete(true)}>
                Delete
              </Button>
              <input
                className={style.Name}
                placeholder="Task name..."
                value={taskEditData.name}
                onChange={(e) => setTaskEditData({ ...taskEditData, name: e.target.value })}
              />
              <textarea
                className={style.Description}
                placeholder="No task description..."
                value={taskEditData.description}
                onChange={(e) => setTaskEditData({ ...taskEditData, description: e.target.value })}
              ></textarea>
              <TaskPriorityPicker
                activePriority={taskEditData.priority}
                setActivePriority={(priority) => setTaskEditData({ ...taskEditData, priority })}
              />
              <Button type="submit" className={style.Button}>
                Confirm
              </Button>
            </form>
          </>
        )}
      </div>
      {task && <div className={style.Wrapper} onClick={handleWrapperClick}></div>}
    </>
  );
};

export default TaskPanel;
