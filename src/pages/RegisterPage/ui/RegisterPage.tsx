import { useEffect, type FC } from "react";
import style from "./RegisterPage.module.scss";
import { Heading } from "../../../shared/ui";

const RegisterPage: FC = () => {
  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <div className={style.Register}>
      <Heading level={1}>Register page</Heading>
    </div>
  );
};

export default RegisterPage;
