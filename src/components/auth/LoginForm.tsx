"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInputField from "../common/customer-inputs/CustomInputField";
import { Button, Spinner } from "react-bootstrap";
import { useLoginMutation } from "@/store/auth/authApi.slice";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

// Define the structure of form inputs
type FormInputs = {
  userName: string;
  password: string;
};

// Initialize the form inputs
const initialState: FormInputs = {
  userName: "",
  password: "",
};

// Define the validation schema using Zod
const zodSchema = z.object({
  userName: z.string().nonempty("Please enter username"),
  password: z
    .string({ required_error: "Please enter last name" })
    .nonempty("Please enter password"),
});

export default function LoginForm({ values }: { values?: FormInputs }) {
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  // Initialize form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: values || initialState,
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    try {
      const response = await login({
        username: data.userName,
        password: data.password,
      }).unwrap();
      if (response) {
        console.log(response);
        const decodedToken = atob(response.token.split(".")[1]); // base64 decode the JWT payload
        const user = JSON.parse(decodedToken).username; // Assuming the payload contains the username
        const expireTime = JSON.parse(decodedToken).exp; // Assuming the payload contains the username
        console.log("decodedToken", decodedToken);
        console.log("user", user);
        dispatch(loginUser({ user, token: response.token, exp: expireTime }));
        router.push("/dashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false); // Ensure state is reset after completion
    }
  };

  console.log("error", errors);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-7 col-lg-4">
        <h4 className="mb-3 text-center">Login</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <CustomInputField
              id="userName"
              label="Username"
              register={register("userName")}
              error={errors.userName?.message}
            />

            <CustomInputField
              id="password"
              label="Password"
              type="password"
              register={register("password")}
              error={errors.password?.message}
            />
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
    </div>
  );
}