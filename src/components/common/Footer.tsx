import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">© Task Manager, Inc</p>

        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <Image
            src="/assets/images/task.png"
            alt="task"
            loading="lazy"
            width={40}
            height={40}
            className="logo"
          />
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <div className="nav-link px-2 text-body-secondary">
              Task Manager
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link px-2 text-body-secondary">Vidura Perera</div>
          </li>
        </ul>
      </footer>
    </div>
  );
}
