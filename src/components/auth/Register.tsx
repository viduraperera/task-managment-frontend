import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <div
      className="container custom-height"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        overflow: "auto",
        height: "74vh",
      }}
    >
      <div className="py-5 text-center">
        <Image
          className="d-block mx-auto mb-4"
          src="/assets/images/task.png"
          alt="Task Manager Logo"
          width="72"
          height="57"
        />
        <h2>Register for Task Manager</h2>
        <p className="lead">
          Join Task Manager to manage your tasks efficiently and stay organized.
          Fill out the form below to create your account.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
