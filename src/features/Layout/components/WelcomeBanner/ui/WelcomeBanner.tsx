import type { FC } from "react";
import style from "./WelcomeBanner.module.scss";
import { Heading, TextItem } from "../../../../../shared/ui";
import { useCurrentDateTime } from "../../../../../shared/hooks/useCurrentDateTIme";

const WelcomeBanner: FC = () => {
  const dateString = useCurrentDateTime();

  return (
    <div className={style.Banner}>
      <Heading level={2}>Welcome to Spacely!</Heading>
      <TextItem size="big">This is your personal workspace</TextItem>
      <TextItem size="big" align="right">
        {dateString}
      </TextItem>
    </div>
  );
};

export default WelcomeBanner;
