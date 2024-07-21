"use client"

import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="custom-height">
      <div className="py-5 text-center">
        <Image
          className="d-block mx-auto mb-4"
          src="/assets/images/task.png"
          alt=""
          width="72"
          height="57"
        />
        <h2>Checkout form</h2>
        <p className="lead">
          Below is an example form built entirely with Bootstrap’s form
          controls. Each required form group has a validation state that can be
          triggered by attempting to submit the form without completing it.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
