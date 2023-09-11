import { useSession } from "next-auth/react";

function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    // Handle the case when the user is not authenticated
    return <div>You are not authenticated.</div>;
  }

  const userEmail = session.user.email;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {session.user.email}</p>

      {/* Render other user details here */}
    </div>
  );
}

export default ProfilePage;
