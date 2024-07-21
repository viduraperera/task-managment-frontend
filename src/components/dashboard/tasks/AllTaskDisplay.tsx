import GenericModal from "@/components/common/generic-containers/GenericModal";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useLazyGetSingleTasksQuery,
  useUpdateTaskMutation,
} from "@/store/tasks/taskApi.slice";
import React, { useState } from "react";
import UpdateTask from "./UpdateTask";
import {
  faArrowRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

interface AllTaskDisplayProps {
  status: string;
}

export default function AllTaskDisplay({ status }: AllTaskDisplayProps) {
  const [deleteConfOpen, setDeleteConfOpen] = useState(false);
  const [changeConfOpen, setChangeConfOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const { data: getTasks, error, isLoading } = useGetTasksQuery({});
  const [getSingleTasks, { data: getSingleTasksDetails }] =
    useLazyGetSingleTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleSelectedTask = (selectedTask: string) => {
    setSelectedTask(selectedTask);
  };

  const handleUpdateStatus = async () => {
    if (selectedTask) {
      const task = await getSingleTasks({ id: selectedTask }).unwrap();
      if (task) {
        let newStatus = "";
        if (task.status === "pending") {
          newStatus = "in-progress";
        } else if (task.status === "in-progress") {
          newStatus = "complete";
        }

        if (newStatus) {
          const payload = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: newStatus,
          };
          try {
            await updateTask({
              id: selectedTask,
              ...payload,
            }).unwrap();
            setChangeConfOpen(false);
            toast.success(`Task status updated to ${newStatus}`);
          } catch (error) {
            console.error("Failed to update task status", error);
            toast.error("Failed to update task status");
          }
        }
      }
    }
  };

  const handleCloseDeleteConfOpen = () => {
    setDeleteConfOpen(false);
    setSelectedTask("");
  };

  const handleCloseChangeConConfOpen = () => {
    setChangeConfOpen(false);
    setSelectedTask("");
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask).unwrap();
        toast.success("task successfully deleted");
      } catch (error) {
        console.error("Failed to update task status", error);
        toast.error("Failed to deleted task");
      }
      setDeleteConfOpen(false);
    }
  };

  console.log("selectedTask", selectedTask);

  return (
    <div className="card-grid" style={{ paddingTop: "20px" }}>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>Error loading tasks</p>}
      {getTasks &&
        getTasks
          .filter((task: Task) => task.status === status)
          .map((task: Task, index: number) => (
            <div
              key={index}
              className="card border-success mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-transparent border-success  d-flex justify-content-between">
                <span>{task.status}</span>
                {status !== "complete" && (
                  <button
                    className="btn btn-light btn-sm"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Tooltip on top"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      handleSelectedTask(task._id);
                      setChangeConfOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
              <div className="card-body text-success">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
              </div>
              <div className="card-footer bg-transparent border-success d-flex justify-content-between align-items-center">
                <span>{task.status}</span>
                <div>
                  <button
                    className="btn btn-light btn-sm me-2"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      handleSelectedTask(task._id);
                      setIsDrawerOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    className="btn btn-light btn-sm"
                    onClick={() => {
                      handleSelectedTask(task._id);
                      setDeleteConfOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      <GenericModal
        show={changeConfOpen}
        handleAction={handleUpdateStatus}
        handleClose={handleCloseChangeConConfOpen}
        title="Status Update"
        body="Are you sure you want update the status"
      />
      <GenericModal
        show={deleteConfOpen}
        handleAction={handleDelete}
        handleClose={handleCloseDeleteConfOpen}
        title="Delete Task"
        body="Are you sure you want delete the task"
      />
      <UpdateTask
        open={isDrawerOpen}
        handleClose={() => {
          setIsDrawerOpen(false);
          setResetForm(true);
        }}
        resetForm={resetForm}
        selectedTask={selectedTask}
      />
    </div>
  );
}
