import type { FC } from "react";
import style from "./Panel.module.scss";
import { Button, Heading } from "../../../../../shared/ui";

const Panel: FC = () => {
  return (
    <>
      <div className={style.Panel}>
        <Heading level={3}>Task details</Heading>
        <form className={style.Form}>
          <input type="text" placeholder="Task name..." className={style.Input} />
          <textarea placeholder="No description..." className={style.Textarea}></textarea>
          <Button className={style.Button}>Confirm</Button>
        </form>
      </div>
      <div className={style.Wrapper}></div>
    </>
  );
};

export default Panel;
