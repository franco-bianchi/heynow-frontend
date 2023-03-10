import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";

const fields = {
  email: "",
  pwd: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { startLogin } = useAuthStore();
  const { email, pwd, onInputChange } = useForm(fields);

  const handleSubmit = (e) => {
    e.preventDefault();
    startLogin({email, password:pwd});
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Bot Project</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="pwd"
                  value={pwd}
                  onChange={onInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Not registered yet?{" "}
            <span>
              <span
                className="text-purple-600 hover:underline"
                onClick={() => navigate("/auth/register")}
                style={{cursor: 'pointer'}}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
