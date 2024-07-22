import React from "react";

export default function GenericDrawer({
  children,
  open,
  handleClose,
  isEditing,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  isEditing?: boolean;
}) {
  return (
    <div
      className={`offcanvas offcanvas-start ${open ? "show" : ""}`}
      tabIndex={-1}
      aria-labelledby="offcanvasWithBothOptionsLabel"
      style={{ visibility: open ? "visible" : "hidden" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          {isEditing ? "Edit Task" : "Crete Task"}
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="offcanvas-body">{children}</div>
    </div>
  );
}
