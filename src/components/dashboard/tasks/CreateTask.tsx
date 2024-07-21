import React from "react";
import TaskForm from "./TaskForm";
import GenericDrawer from "@/components/common/generic-containers/GenericDrawer";

export default function CreateTask({
  resetForm,
  open,
  handleClose,
}: {
  resetForm: boolean;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <div>
      <GenericDrawer open={open} handleClose={handleClose}>
        <TaskForm resetForm={resetForm} handleClose={handleClose} />
      </GenericDrawer>
    </div>
  );
}
