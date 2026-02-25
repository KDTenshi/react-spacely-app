export type TColumnType = "todo" | "doing" | "done";

export type TTask = {
  id: string;
  name: string;
  description: string;
  column: TColumnType;
};
