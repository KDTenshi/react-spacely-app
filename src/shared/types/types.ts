export type TColumnType = "todo" | "doing" | "done";

export type TTaskPriority = "low" | "moderate" | "high";

export type TTask = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  column: TColumnType;
  priority: TTaskPriority;
};

export type ListUnion<T extends string | number> = { [key in T]: string };
