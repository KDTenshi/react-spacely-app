import type { FC } from "react";
import style from "./TaskPanel.module.scss";
import { Heading } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { clearEditingTaskID } from "../../../shared/store/tasksSlice";

const TaskPanel: FC = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.editingTaskID ? state.tasks.tasksList[state.tasks.editingTaskID] : null,
  );

  return (
    <>
      <div className={task ? style.Shown : style.Hidden}>
        <Heading level={3}>Task details</Heading>
        {task && (
          <form className={style.Form}>
            <Heading level={4}>{task.name}</Heading>
            <textarea className={style.Description} placeholder="No task description..."></textarea>
          </form>
        )}
      </div>
      {task && <div className={style.Wrapper} onClick={() => dispatch(clearEditingTaskID())}></div>}
    </>
  );
};

export default TaskPanel;
