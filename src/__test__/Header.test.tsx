import React from "react"; // Ensure React is imported
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "../components/common/Header";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import apiSlice from "@/store/utility/api.slice";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useStore: jest.fn(),
  }));
describe("Header Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock the useSelector to simulate the user not being logged in
    (useSelector as unknown as jest.Mock).mockReturnValue(null);
  });

  test("renders Login button and its content correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("renders Register button and its content correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: /Sign-up/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Sign-up/i)).toBeInTheDocument();
    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
