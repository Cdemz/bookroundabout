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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable the button while processing

    // Dispatch loginUserAction with formData and wait for the result
    try {
      const success = await dispatch(loginUserAction(formData)); // Ensure formData is passed here
      if (!success) {
        setIsButtonDisabled(false);
        // Redirect on successful login
      } else {
        router.push("/"); // Re-enable the button if login fails
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsButtonDisabled(false); // Re-enable the button in case of error
    }
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(loginUserAction(formData));
  // };

  const userData = useSelector((state: RootState) => state.user?.userData);
  useEffect(() => {
    dispatch(fetchUserAction() as any);
  }, [dispatch]);

  //To check is user data exists but leigh said i should remove it
  // useEffect(() => {
  //   if (userData) {
  //     // If the user is already authenticated
  //     // Redirect to the home page and display a message
  //     router.push("/"); // Redirect to the home page
  //     setIsButtonDisabled(true); // Disable the button
  //     const interval = setInterval(() => {
  //       // Countdown timer logic
  //       if (countdown > 0) {
  //         setCountdown(countdown - 1); // Decrease countdown timer by 1 second
  //       } else {
  //         clearInterval(interval); // Clear the interval when the countdown reaches 0
  //         setIsButtonDisabled(false); // Enable the button
  //       }
  //     }, 1000); // Update countdown every 1000 milliseconds (1 second)

  //     return () => clearInterval(interval); // Clean up the interval on component unmount
  //   }
  // }, [userData, router, countdown]);

  // Function to handle button click
  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      router.push("/"); // Manually trigger the redirect when the button is clicked
    }
  };

  return (
    <div className="">
      <div>
        <h1 className="text-[var(--color-text)] font-bold my-4 mx-auto">
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
          <button className="button-submit bg-black" type="submit">
            Sign In
          </button>
          <div className=""></div>
          <p className="p">
            Don't have an account?{" "}
            <span className="span">
              <Link href="/register">Sign Up</Link>
            </span>
          </p>{" "}
          <div className="flex-row mt-2 mx-auto">
            <div>
              <Link href="/forgotPassword">
                <button>
                  <span className="span">Forgot password?</span>
                </button>
              </Link>
            </div>
          </div>
        </form>

        {/* stop  */}
      </div>
    </div>
  );
};

export default CustomSignIn;
