import React from "react";

export default function Login() {
  return (
    <div className="custom-height">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
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
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-lg-4">
          <h4 className="mb-3 text-center">Login</h4>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Username</label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                  />
                  <div className="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">
                  Email <span className="text-body-secondary">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "40px" }}>
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
