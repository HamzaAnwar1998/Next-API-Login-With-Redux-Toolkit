"use client";

import { loginUser } from "@/lib/slices/UserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // dispatch
  const dispatch = useDispatch();

  // router
  const router = useRouter();

  // submit event
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.payload) {
        setEmail("");
        setPassword("");
        router.push("/");
      }
    });
  };

  // destructure redux state
  const { loading, error } = useSelector((state) => state.user);

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-500 rounded p-3 mt-2 mb-2">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox rounded text-blue-500 focus:ring-blue-400 focus:ring-opacity-50"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
