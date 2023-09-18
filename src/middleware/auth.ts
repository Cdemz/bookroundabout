// middleware/auth.js
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuthMiddleware() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated by verifying the presence of a token
    const token = localStorage.getItem("token");

    // if (!token) {
    //   // If not authenticated, redirect to the login page
    //   router.push("/login");
    // }

    // Fetch user data and store it in localStorage
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://booksra.helioho.st/v1/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          // Handle error fetching user data
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  return true; // This hook can be used as a guard in protected routes
}
