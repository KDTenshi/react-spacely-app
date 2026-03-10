import style from "./TaskPanel.module.scss";
import { Button, Heading } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { clearEditingTaskID, editTask } from "../../../shared/store/tasksSlice";
import { useEffect, useState, type FC } from "react";

type TaskEditData = {
  name: string;
  description: string;
};

const TaskPanel: FC = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.editingTaskID ? state.tasks.tasksList[state.tasks.editingTaskID] : null,
  );

  const [taskEditData, setTaskEditData] = useState<TaskEditData>({ name: "", description: "" });

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTaskEditData({ name: task.name, description: task.description });
    }
  }, [task]);

  const handleEditTask = () => {
    if (!task) return;

    const name = taskEditData.name.trim();
    const description = taskEditData.description.trim();

    if (name === task.name && description === task.description) return;

    if (name) {
      dispatch(editTask({ taskID: task.id, name, description }));
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
      <div className={task ? style.Shown : style.Hidden}>
        <Heading level={3}>Task details</Heading>
        {task && (
          <form className={style.Form} onSubmit={handleSubmit}>
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
            <Button type="submit" className={style.Button}>
              Confirm
            </Button>
          </form>
        )}
      </div>
      {task && <div className={style.Wrapper} onClick={handleWrapperClick}></div>}
    </>
  );
};

export default TaskPanel;
