"use client";

import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPageComponent() {
  const userDataName = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center custom-height">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Welcome to Task Manager</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Task Manager helps you organize your tasks efficiently. Stay on top of
          your work with our intuitive task manager app.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <Link href={userDataName ? "/dashboard" : "/register"}>
            <button
              className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
              type="button"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
