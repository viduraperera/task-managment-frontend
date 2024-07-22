"use client";

import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Login() {
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
        <h2>Login to Task Manager</h2>
        <p className="lead">
          Welcome back! Please log in to your Task Manager account to continue
          managing your tasks efficiently.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
