"use client";

import { logoutUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const userDataName = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = () => {
    dispatch(logoutUser());
    router.push("/"); // Redirect to the home page
  };

  if (!isMounted) return null;

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            className="d-inline-flex link-body-emphasis text-decoration-none"
            href="/"
          >
            <Image
              src="/assets/images/task.png"
              alt="task"
              loading="lazy"
              width={40}
              height={40}
              className="logo"
            />
          </Link>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"></ul>
        <div className="col-md-3 text-end">
          {userDataName ? (
            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link className="navbar-brand" href="/login">
                <button type="button" className="btn btn-outline-primary me-2">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <Button type="button" className="btn btn-primary">
                  Sign-up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
