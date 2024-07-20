import React from "react";

export const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <div className="invalid-feedback">{message}</div> : null;
