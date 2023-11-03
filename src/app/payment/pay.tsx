import React from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  // Define any props you need here
}

const PaymentPage: React.FC<Props> = (props) => {
  const userData = useSelector((state: RootState) => state.user?.userData);
  // Define any state variables you need here
  // Define any functions you need here

  return (
    // Define your JSX here
    <div>
      <div className=" text-black">
        {userData ? (
          <div className=""></div>
        ) : (
          <div>
            {/* User is not logged in */}
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
      <h1>Payment Page</h1>
      <p>Welcome to the payment page!</p>
    </div>
  );
};

export default PaymentPage;
