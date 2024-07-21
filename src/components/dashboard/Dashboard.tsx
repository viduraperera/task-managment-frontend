import { checkTokenExpiry } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTaskDisplay from "./tasks/AllTaskDisplay";
import StatusTabsMain from "./StatusTabsMain";
import GenericDrawer from "../common/generic-containers/GenericDrawer";
import CreateTask from "./tasks/CreateTask";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const userData = useSelector((state: RootState) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    dispatch(checkTokenExpiry());
    if (userData.isAuthenticated === false) {
      router.push("/");
    }
  }, [dispatch, userData.isAuthenticated, router]);

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
      <div>
        <div style={{ paddingBottom: "20px" }}>
          <button
            className="btn btn-primary btn-custom" // Full width on small screens, inline-block on larger screens
            onClick={() => {
              setIsDrawerOpen(true);
              setResetForm(false);
            }}
          >
            Create Task
          </button>
        </div>

        <CreateTask
          open={isDrawerOpen}
          handleClose={() => {
            setIsDrawerOpen(false);
            setResetForm(true);
          }}
          resetForm={resetForm}
        />
      </div>
      <StatusTabsMain />
    </div>
  );
}
