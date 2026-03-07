export type TColumnType = "todo" | "doing" | "done";

export type TTask = {
  id: string;
  name: string;
  description: string;
  column: TColumnType;
};

export type ListUnion<T extends string | number> = { [key in T]: string };
