"use client";

import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const data = JSON.stringify(getTodos.data);

  const dick = trpc.getDick.useQuery();
  const dickData = JSON.stringify(dick.data);
  return (
    <div>
      {data} {dickData}
    </div>
  );
}
