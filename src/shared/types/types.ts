export type TColumnType = "todo" | "doing" | "done";

export type TTaskPriority = "low" | "moderate" | "high";

export type TTask = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  column: TColumnType;
  boardID: string;
  priority: TTaskPriority;
};

export type TBoard = {
  id: string;
  name: string;
  tasksList: { [key in string]: TTask };
  columns: { [key in TColumnType]: string[] };
};

export type ListUnion<T extends string | number> = { [key in T]: string };
