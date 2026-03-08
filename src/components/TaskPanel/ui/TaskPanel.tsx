import type { FC } from "react";
import style from "./TaskPanel.module.scss";
import { Heading } from "../../../shared/ui";

const TaskPanel: FC = () => {
  return (
    <>
      <div className={style.Panel}>
        <Heading level={3}>Task details</Heading>
        <form className={style.Form}>
          <Heading level={4}>Task name</Heading>
          <textarea className={style.Description} placeholder="No task description..."></textarea>
        </form>
      </div>
      <div className={style.Wrapper}></div>
    </>
  );
};

export default TaskPanel;
