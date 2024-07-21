import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <div
      className="container custom-height"
      style={{
        flexDirection: "column",
        flexWrap: "nowrap",
        overflow: "auto",
        height: "height: 74vh",
      }}
    >
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
      <RegisterForm />
    </div>
  );
}
