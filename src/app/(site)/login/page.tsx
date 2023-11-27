"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../../redux/store";
import { fetchUserAction, loginUserAction } from "../../redux/actions";
import { FcGoogle } from "react-icons/fc";
import { Toaster } from "react-hot-toast";
import { Dispatch } from "redux";
import "./login.css";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const CustomSignIn = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const login = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const router = useRouter();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled status
  const [countdown, setCountdown] = useState(30); // Countdown timer in seconds

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction(formData));
  };

  const userData = useSelector((state: RootState) => state.user?.userData);
  useEffect(() => {
    dispatch(fetchUserAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      // If the user is already authenticated
      // Redirect to the home page and display a message
      router.push("/"); // Redirect to the home page
      setIsButtonDisabled(true); // Disable the button
      const interval = setInterval(() => {
        // Countdown timer logic
        if (countdown > 0) {
          setCountdown(countdown - 1); // Decrease countdown timer by 1 second
        } else {
          clearInterval(interval); // Clear the interval when the countdown reaches 0
          setIsButtonDisabled(false); // Enable the button
        }
      }, 1000); // Update countdown every 1000 milliseconds (1 second)

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [userData, router, countdown]);

  // Function to handle button click
  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      router.push("/"); // Manually trigger the redirect when the button is clicked
    }
  };

  return (
    <div className="">
      {!userData ? (
        <div>
          <h1 className="text-[var(--color-text)] font-bold my-4">
            MY ACCOUNT
          </h1>
          {/* Start  */}

          <form className="form" method="POST" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input text-[var(--color-text)]"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                value={password}
                onChange={handleChange}
                className="input text-[var(--color-text)]"
                placeholder="Enter your Password"
                name="password"
                required
              />
            </div>

            <div className="flex-row mt-2">
              <div>
                <Link href="/forgotPassword">
                  <button>
                    <span className="span">Forgot password?</span>
                  </button>
                </Link>
              </div>
            </div>
            <button className="button-submit bg-black" type="submit">
              Sign In
            </button>
            <div className=""></div>
            <p className="p">
              Don't have an account?{" "}
              <span className="span">
                <Link href="/register">Sign Up</Link>
              </span>
            </p>
          </form>

          {/* stop  */}
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-6 justify-center items-center lato md:h-[80vh]">
          <BeatLoader color="#4d5bf8" size={40} />
          <p className="text-[var(--color-text)] font-bold text-lg ">
            Welcome!
          </p>
          <h1 className="text-[var(--color-primary)]">
            You are already logged in. Redirecting...
          </h1>
          <div className="flex flex-col items-center justify-center text-[var(--color-text)] mt-6 text-center gap-4 md:gap-6">
            <p>
              {" "}
              If not redirected in {countdown} seconds click the button below to
              go to the home page.
            </p>
            <button
              className={`${
                isButtonDisabled ? "bg-gray-400" : "bg-[var(--color-primary)]"
              } text-white px-4 py-2 lato text-sm mt-auto rounded-sm `}
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSignIn;
