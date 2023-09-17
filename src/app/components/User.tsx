"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../redux/actions"; // Import your fetch user action
import { RootState } from "../redux/store";

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
        <div className="text-red-500">
          <h1>User Profile</h1>
          <p>Name: {userData.firstName}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p className="text-red-500">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;

// import { useSession } from "next-auth/react";

// function ProfilePage() {
//   const { data: session } = useSession();

//   if (!session) {
//     // Handle the case when the user is not authenticated
//     return <div>You are not authenticated.</div>;
//   }

//   const { user } = session;
//   console.log("user:", user.email);

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>Email: {user.email}</p>

//       {/* Render other user details here */}
//     </div>
//   );
// }

// export default ProfilePage;
