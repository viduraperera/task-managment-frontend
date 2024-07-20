import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <Image
              src=""
              alt="Animal"
              loading="lazy"
              width={40}
              height={40}
              className="logo"
            />
          </a>
        </div>
        <div className="col-md-3 text-end">
          <Link className="navbar-brand" href="/login">
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
          </Link>
          <button type="button" className="btn btn-primary">
            Sign-up
          </button>
        </div>
      </header>
    </div>
  );
}
