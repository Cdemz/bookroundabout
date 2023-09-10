"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie"; // Import the Cookies type specifically
import "./login.css";
import jwtDecode from "jwt-decode";

const CustomSignIn = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const token = Cookies.get("token");
  const isLogin = token && jwtDecode(token) ? true : false;
  console.log(isLogin);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://booksra.helioho.st/v1/user/login",
        {
          email,
          password,
        }
      );

      const bearerToken = response.data.token;
      // Save the bearer token as a JWT token (e.g., in a cookie)
      Cookies.set("token", bearerToken);

      // Redirect to /account on successful login

      router.push("/account");

      // Show success toast
      toast.success("Login successful", {
        duration: 2000, // 2 seconds
      });

      // Handle login failure here
    } catch (error) {
      // Handle any network or other errors here
      toast.error("Error occurred"); // Show error toast
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <Toaster />
      {!isLogin ? (
        <div>
          <h1 className="text-[var(--color-text)] font-bold my-4">
            MY ACCOUNT
          </h1>
          <form className="form" method="POST" onSubmit={handleLogin}>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input text-[var(--color-text)]"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
              />
            </div>

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input text-[var(--color-text)]"
                placeholder="Enter your Password"
              />
            </div>

            <div className="flex-row">
              <div>
                <span className="span">Forgot password?</span>
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
            <p className="p line">Or With</p>

            <div className="flex-row text-[var(--color-text)]">
              <button className="btn google" onClick={() => signIn("github")}>
                <FcGoogle />
                Google
              </button>
            </div>
          </form>

          <h1>New user?</h1>
          <p>Register</p>
        </div>
      ) : (
        // User is already authenticated, display a message or redirect as needed
        <p>You are already logged in.</p>
      )}
    </div>
  );
};

export default CustomSignIn;
