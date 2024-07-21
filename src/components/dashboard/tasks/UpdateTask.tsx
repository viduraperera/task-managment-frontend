import GenericDrawer from "@/components/common/generic-containers/GenericDrawer";
import React from "react";
import TaskForm from "./TaskForm";

export default function UpdateTask({
  resetForm,
  open,
  handleClose,
  selectedTask,
}: {
  resetForm: boolean;
  open: boolean;
  handleClose: () => void;
  selectedTask?: string;
}) {
  return (
    <div>
      <GenericDrawer open={open} handleClose={handleClose}>
        <TaskForm
          resetForm={resetForm}
          handleClose={handleClose}
          isEditing
          selectedTaskId={selectedTask}
        />
      </GenericDrawer>
    </div>
  );
}
