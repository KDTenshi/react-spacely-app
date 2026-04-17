import { useState, type FC } from "react";
import style from "./AddTaskForm.module.scss";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { createTask } from "../../../store/tasksSlice";
import { Button, Icon, Input } from "../../../../../shared/ui";

const AddTaskForm: FC = () => {
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
  return (
    <div className={style.Wrapper}>
      <form className={style.Form} onSubmit={handleAddTask}>
        <Input
          placeholder="Task name..."
          className={style.Input}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button type="submit">
          <Icon icon="add" size="small" />
          Add task
        </Button>
      </form>
    </div>
  );
};

export default AddTaskForm;
