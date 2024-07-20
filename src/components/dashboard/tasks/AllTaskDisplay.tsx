import { useGetTasksQuery } from "@/store/tasks/taskApi.slice";
import React from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

interface AllTaskDisplayProps {
  status: string;
}

export default function AllTaskDisplay({ status }: AllTaskDisplayProps) {
  const { data: getTasks, error, isLoading } = useGetTasksQuery({});

  return (
    <div className="card-grid" style={{ paddingTop: "20px" }}>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>Error loading tasks</p>}
      {getTasks &&
        getTasks
          .filter((task: Task) => task.status === status) // Filter tasks by status
          .map((task: Task, index: number) => (
            <div
              key={index}
              className="card border-success mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-transparent border-success">
                {task.priority}
              </div>
              <div className="card-body text-success">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
              </div>
              <div className="card-footer bg-transparent border-success">
                {task.status}
              </div>
            </div>
          ))}
    </div>
  );
}
