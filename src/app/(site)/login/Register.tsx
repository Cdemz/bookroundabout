import React from "react";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { BsLockFill } from "react-icons/bs";
const Register = () => {
  return (
    <div>
      <h1 className="text-[var(--color-text)] font-bold my-4">MY ACCOUNT</h1>
      <form className="form">
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <FiAtSign />

          <input type="text" className="input" placeholder="Enter your Email" />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <BsLockFill />
          {/* ... */}

          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
          />
          <BsLockFill />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit">Sign In</button>
        <p className="p">
          Don't have an account? <span className="span">Register</span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google">
            <FcGoogle />
            Google
          </button>
          <button className="btn apple">
            <AiFillApple />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
