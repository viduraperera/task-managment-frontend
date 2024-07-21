import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../helpers";

export default function CustomSelectField({
  id,
  label,
  options,
  register,
  error,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: ReturnType<UseFormRegister<FieldValues>>;
  error?: string;
}) {
  return (
    <div className="col-12">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id={id}
        {...register}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage message={error} />
    </div>
  );
}
