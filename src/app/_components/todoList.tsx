"use client";

import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const data = JSON.stringify(getTodos.data);
 
  return <div>{data}</div>;
}
