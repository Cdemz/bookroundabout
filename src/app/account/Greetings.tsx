"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../redux/actions"; // Import your fetch user action
import { RootState } from "../redux/store";
import { BeatLoader } from "react-spinners";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user?.userData);

  useEffect(() => {
    // Dispatch the action to fetch user details
    dispatch(fetchUserAction() as any);
  }, [dispatch]);

  return (
    <div>
      {userData ? (
        <div className="text-[(--color-text)] font-bold text-2xl lato">
          <h1>Welcome {userData.firstName}</h1>
        </div>
      ) : (
        <p className="text-[(--color-text)]">
          <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-[var(--color-text)]">
            <p>User data loading...</p>
            <BeatLoader color="#4d5bf8" size={40} />
          </div>
        </p>
      )}
    </div>
  );
};

export default UserProfile;
