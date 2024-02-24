import React, { useState } from "react";
import Modal from "react-modal";
import "./styles/index.css";

Modal.setAppElement("#root");
const FormModal = ({ isOpen, onClose }) => {
  const [formType, setFormType] = useState("Login");

  const handleSignupLinkClick = () => {
    setFormType("Signup");
  };

  const handleLoginLinkClick = () => {
    setFormType("Login");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      className="modal-content fixed-center relative z-50 bg-white p-4 rounded-lg shadow-lg"
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={onClose}
            className="absolute top-0 right-2 m-4 text-gray-500 cursor-pointer"
          >
            X
          </button>

          <img
            className="mx-auto h-20 w-auto"
            src="src\assets\cathotpot.jpg"
            alt="FoodCat Hotpot"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {formType === "Login" ? "Sign In" : "Sign Up"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex mb-3">
            <button
              disabled
              className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight"
            >
              +60
            </button>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Phone number"
              pattern="\(\d{9}\)"
              className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-400"
            />
          </div>
          {formType === "Login" ? (
            ""
          ) : (
            <div className="sm:col-span-4">
              <div className="mb-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-400"
                />
              </div>

              <fieldset className="flex mb-3">
                <div className="flex items-center gap-x-1">
                  <input
                    id="maleRadio"
                    name="genderRadio"
                    type="radio"
                    className=""
                  />
                  <label
                    htmlFor="maleRadio"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    Mr.
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="femaleRadio"
                    name="genderRadio"
                    type="radio"
                    className="ml-3"
                  />
                  <label
                    htmlFor="femaleRadio"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    Ms.
                  </label>
                </div>
              </fieldset>
              <div className="mb-3">
                <input
                  id="username"
                  type="username"
                  placeholder="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-400"
                />
              </div>
            </div>
          )}
          <div className="mb-6">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-orange hover:bg-dark-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
              type="button"
            >
              {formType === "Login" ? "Login" : "Register"}
            </button>
          </div>
          {formType === "Login" ? (
            <span className="text-center block mt-4">
              Don't have an account?{" "}
              <a
                onClick={handleSignupLinkClick}
                className="text-orange cursor-pointer hover:underline"
              >
                Sign up
              </a>
            </span>
          ) : (
            <span className="text-center block mt-4">
              Already have an account?{" "}
              <a
                onClick={handleLoginLinkClick}
                className="text-orange cursor-pointer hover:underline"
              >
                Sign in
              </a>
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
