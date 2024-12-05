"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // router
  const router = useRouter();

  // user
  const [user, setUser] = useState(null);

  // is client?
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // prevent rendering jsx until the component has mounted on client
  if (!isClient) {
    return null;
  }

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
            <button
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => {
                // Clear user from localStorage and refresh/re-route
                localStorage.removeItem("user");
                window.location.reload(); // Or use a router method to redirect
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              router.push("/login");
            }}
          >
            Go to Login
          </button>
        </div>
      )}
    </>
  );
}
