export const getDateString = (timestamp: number) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hourString = hours >= 10 ? `${hours}` : `0${hours}`;
  const minutesString = minutes >= 10 ? `${minutes}` : `0${minutes}`;

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthString = month >= 10 ? `${month}` : `0${month}`;

  return `${hourString}:${minutesString} | ${day}.${monthString}.${year}`;
};
