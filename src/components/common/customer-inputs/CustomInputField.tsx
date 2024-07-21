import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../helpers";

export default function CustomInputField({
  id,
  label,
  type = "text",
  register,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  error?: string;
}) {
  return (
    <div className="col-12">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        {...register}
      />
      <ErrorMessage message={error} />
    </div>
  );
}
