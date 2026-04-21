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
  columns: Record<TColumnType, string[]>;
};

export type ListUnion<T extends string | number> = Record<T, string>;
