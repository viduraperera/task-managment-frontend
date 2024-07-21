import CustomInputField from "@/components/common/customer-inputs/CustomInputField";
import CustomSelectField from "@/components/common/customer-inputs/CustomSelectField ";
import CustomTextareaField from "@/components/common/customer-inputs/CustomTextareaField";
import {
  useCreateTaskMutation,
  useLazyGetSingleTasksQuery,
  useUpdateTaskMutation,
} from "@/store/tasks/taskApi.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type FormInputs = {
  title: string;
  description: string;
  priority: string;
  status: string;
};

// Initialize the form inputs
const initialState: FormInputs = {
  title: "",
  description: "",
  priority: "",
  status: "",
};

const zodSchema = z.object({
  title: z.string().nonempty("Please enter username"),
  description: z.string().nonempty("Please enter password"),
  priority: z.string().nonempty("Please add a priority"),
  status: z.string().optional(),
});

export default function TaskForm({
  values,
  resetForm,
  handleClose,
  isEditing,
  selectedTaskId,
}: {
  values?: FormInputs;
  resetForm: boolean;
  handleClose: () => void;
  isEditing?: boolean;
  selectedTaskId?: string;
}) {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: values || initialState,
    resolver: zodResolver(zodSchema),
  });

  const [getSingleTasks, { data: getSingleTasksDetails }] =
    useLazyGetSingleTasksQuery();

  useEffect(() => {
    if (resetForm) {
      reset(initialState);
    }
  }, [resetForm, reset]);
  console.log("selectedTaskId", selectedTaskId);

  useEffect(() => {
    if (isEditing && selectedTaskId) {
      getSingleTasks({ id: selectedTaskId });
    }
  }, [getSingleTasks, isEditing, selectedTaskId]);

  console.log("getSingleTasksDetails", getSingleTasksDetails);

  useEffect(() => {
    if (isEditing && getSingleTasksDetails) {
      setValue("title", getSingleTasksDetails.title);
      setValue("description", getSingleTasksDetails.description);
      setValue("priority", getSingleTasksDetails.priority);
      setValue("status", getSingleTasksDetails.status);
    }
  }, [isEditing, getSingleTasksDetails, setValue]);

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    try {
      if (isEditing && selectedTaskId) {
        await updateTask({ id: selectedTaskId, ...data }).unwrap();
        toast.success("Task updated successfully");
      } else {
        await createTask(data).unwrap();
        toast.success("Task created successfully");
      }
      reset(initialState);
      handleClose();
    } catch (error) {
      console.error(`Failed to ${isEditing ? "update" : "create"} task`, error);
      toast.error(`Failed to ${isEditing ? "update" : "create"} task`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "complete", label: "Complete" },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <CustomInputField
            id="title"
            label="Title"
            register={register("title")}
            error={errors.title?.message}
          />

          <CustomTextareaField
            id="description"
            label="Description"
            register={register("description")}
            error={errors.description?.message}
          />

          <CustomSelectField
            id="priority"
            label="Priority"
            options={priorityOptions}
            register={register("priority")}
            error={errors.priority?.message}
          />
          {isEditing && (
            <CustomSelectField
              id="status"
              label="status"
              options={statusOptions}
              register={register("status")}
              error={errors.status?.message}
            />
          )}
        </div>
        <div style={{ paddingTop: "40px" }}>
          <Button
            className="w-100 booking-button "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ color: "black" }}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
