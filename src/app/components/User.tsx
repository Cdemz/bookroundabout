"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../redux/actions";
import { RootState } from "../redux/store";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user?.userData);
  // Log the userData to the console
  // console.log("userData:", userData);

  useEffect(() => {
    dispatch(fetchUserAction() as any);
  }, [dispatch]);

  return (
    <div>
      {userData ? (
        <div className="text-red-500">
          <h1>User Profile</h1>
          <p>First Name: {userData.firstName}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p className="text-red-500">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
