import React, { useState } from "react";
import { registerUser } from "../../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/userAvatar.png";
import useRegisterUser from "../../services/useRegisterUser";
import toast from "react-hot-toast";

const Register = () => {
  const [salutation, setSalutation] = useState("Mr");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("0");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  const navigate = useNavigate();

  const { registerUser, loading, message } = useRegisterUser();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !fullname ||
      !password ||
      !phone ||
      !role ||
      !avatar
    ) {
      window.alert("All fields are required!");
      return;
    }

    const userData = new FormData();
    userData.append("avatar", avatar);
    userData.append("salutation", salutation);
    userData.append("username", username);
    userData.append("email", email);
    userData.append("fullname", fullname);
    userData.append("password", password);
    userData.append("phone", phone);
    userData.append("role", role);

    // const register = await registerUser(userData);
    const register = await registerUser(userData);
    if (register) {
      navigate("/login");
      toast.success("Registeration successfull");
    } else {
      toast.error("Unable to register");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="sm:px-56 sm:py-24">
        <span className="loading loading-spinner text-error"></span>
        <form
          className="max-w-sm mx-auto border border-black p-8 rounded-md"
          onSubmit={handleRegister}
        >
          <h2 className="text-center font-bold pb-8 text-red">REGISTER</h2>

          {/* Avatar Section */}
          <div className="mb-5 text-center">
            <div className="mb-5 grid justify-center">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full cursor-pointer border-2 border-gray-300"
                onClick={() => document.getElementById("avatarInput").click()} // Trigger file input on click
              />
              <p
                className="text-sm text-black py-2 underline"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                Upload avatar
              </p>
            </div>

            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Salutation
            </label>
            <select
              name="salutation"
              id="salutation"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johnwick"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your fullname
            </label>
            <input
              type="text"
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john wick"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
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
              placeholder="johnwick@gmail.com"
              value={email}
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
              value={password}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone number
            </label>
            <input
              type="text"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="9899563912"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your role
            </label>
            <select
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="0">Buyer/Seller</option>
              <option value="1">Broker</option>
              <option value="2">User/Client</option>
            </select>
          </div>

          <div className="flex items-start mt-5 mb-5">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-red">
                Login
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-red text-white sm:w-full hover:bg-red-dark duration-700 hover:shadow-2xl  font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
