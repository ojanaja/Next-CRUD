"use client";

import TaskCard from "@/components/TaskCard";
import useSWR from "swr";


export default function HomePage() {
  const fetcher = async (url, headers) => await fetch(url, { 'method': 'GET', headers }).then(res => res.json())

  const { data, error } = useSWR([`/api/tasks/`], fetcher);
  return (
    <div className="grid md:grid-cols-3 gap-2">
      {(data ?? []).map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}