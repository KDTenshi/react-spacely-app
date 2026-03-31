import { useEffect, type FC } from "react";
import style from "./LoginPage.module.scss";
import { Heading } from "../../../shared/ui";

const LoginPage: FC = () => {
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <div className={style.Login}>
      <Heading level={1}>Login page</Heading>
    </div>
  );
};

export default LoginPage;
