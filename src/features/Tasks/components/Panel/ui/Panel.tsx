import { useEffect, useState, type FC } from "react";
import style from "./Panel.module.scss";
import { Button, Heading } from "../../../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import type { TTaskPriority } from "../../../../../shared/types/types";
import { clearEditingTaskID, editTask } from "../../../store/tasksSlice";
import { PriorityPicker } from "../../PriorityPicker";

const Panel: FC = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.selectedBoardID
      ? state.tasks.editingTaskID
        ? state.tasks.boardsList[state.tasks.selectedBoardID].tasksList[state.tasks.editingTaskID]
        : null
      : null,
  );

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState<TTaskPriority>("low");

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTaskName(task.name);
      setTaskDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleEditTask = () => {
    const name = taskName.trim();
    const description = taskDescription.trim();

    if (name) {
      dispatch(editTask({ name, description, priority }));
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    handleEditTask();
  };

  const handleWrapperClick = () => {
    handleEditTask();
    dispatch(clearEditingTaskID());
  };

  return (
    <>
      <div className={task ? style.Shown : style.Hidden}>
        <Heading level={3}>Task details</Heading>
        {task && (
          <form className={style.Form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task name..."
              className={style.Input}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
              placeholder="No description..."
              className={style.Textarea}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <PriorityPicker activePriority={priority} setActivePriority={setPriority} />
            <Button className={style.Button}>Confirm</Button>
          </form>
        )}
      </div>
      {task && <div className={style.Wrapper} onClick={handleWrapperClick}></div>}
    </>
  );
};

export default Panel;
