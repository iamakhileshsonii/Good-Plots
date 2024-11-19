// src/components/Login.js
import React, { useContext, useState } from "react";
import { loginUserAPI } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUserAPI({ email, password }); //Fetch data from login API
    if (response.status === 200) {
      await login(response.data.data.accessToken);
      toast.success("Login successfull");
      navigate("/dashboard/explore-listings");
    } else if (response.status === 401) {
      toast.error("Provided email or password is wrong");
    } else if (response.status === 404) {
      toast.error("User not found with provided credentials");
    } else {
      toast.error("Unable to login");
    }
  };

  return (
    <div className="sm:px-56 sm:py-24">
      <form
        className="max-w-sm mx-auto border border-black p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center font-bold pb-8 text-red">LOGIN</h2>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="goodname@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-start mt-5 mb-5">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-red">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red  text-white sm:w-full hover:bg-red-dark duration-700 hover:shadow-2xl bg-black font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
