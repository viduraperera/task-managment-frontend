import React from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../helpers";

export default function CustomTextareaField({
  id,
  label,
  register,
  error,
}: {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  error?: string;
}) {
  return (
    <div className="col-12">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        style={{ height: "100px" }}
        {...register}
      ></textarea>
      <ErrorMessage message={error} />
    </div>
  );
}
