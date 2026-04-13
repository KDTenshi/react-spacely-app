import { useEffect, useState } from "react";

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  day: "2-digit",
  month: "short",
  year: "numeric",
  weekday: "short",
  hour12: false,
};

export const useCurrentDateTime = () => {
  const [dateString, setDateString] = useState(new Date().toLocaleString("en-US", dateTimeOptions));

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(new Date().toLocaleString("en-US", dateTimeOptions));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return dateString;
};
