import { checkTokenExpiry, logoutUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const userData = useSelector((state: RootState) => state.user);

  const handleSignOut = () => {
    dispatch(logoutUser());
    router.push("/"); // Redirect to the home page
  };

  useEffect(() => {
    dispatch(checkTokenExpiry());
    if (userData.isAuthenticated === false) {
      router.push("/");
    }
  }, [dispatch, userData.isAuthenticated, router]);

  const cards = Array.from({ length: 7 }, (_, index) => (
    <div
      key={index}
      className="card border-success mb-3"
      style={{ maxWidth: "18rem" }}
    >
      <div className="card-header bg-transparent border-success">
        Header {index + 1}
      </div>
      <div className="card-body text-success">
        <h5 className="card-title">Primary card title {index + 1}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </p>
      </div>
      <div className="card-footer bg-transparent border-success">
        Footer {index + 1}
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="card-grid">
        {cards}
      </div>
    </div>
  );
}
