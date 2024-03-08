import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUsername } from "./actions";
import Modal from "react-modal";
import "./styles/index.css";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "./firebase.js";

Modal.setAppElement("#root");

const FormModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [signInMethod, setSignInMethod] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [userIsSignedIn] = useAuthState(auth);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const checkIsRegistered = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/checkRegistration/${auth.currentUser.uid}`
      );
      const data = await response.json();
      if (data.isRegistered) {
        onClose();
      } else {
        console.log("User is not registered.");
      }
    } catch (error) {
      console.error("Error checking user registration:", error);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setSignInMethod("Google");
      setEmail(result.user.email);
      dispatch(setUsername(result.user.displayName));
      checkIsRegistered();
    } catch (e) {
      console.error("Google Sign-In Error:", e);
    }
  };

  const sendOtp = async (phoneNumber) => {
    try {
      const formatPhoneNumber = "+60" + phoneNumber;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        callback: () => {
          setCaptchaCompleted(true);
          setTimeout(() => {
            setCaptchaCompleted(false);
          }, 8000);
        },
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        formatPhoneNumber,
        recaptcha
      );
      setUser(confirmation);
    } catch (error) {
      console.error("Error sending SMS:", error);
      setCaptchaError(true);
      setTimeout(() => {
        setCaptchaError(false);
      }, 8000);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log("Phone number verified" + ": " + data);
      setSignInMethod("Phone Number");
      setEmail("");
      checkIsRegistered();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleUsernameChange = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const saveProfile = async () => {
    try {
      const userProfile = {
        userId: auth.currentUser.uid,
        signInMethod: signInMethod,
        email: email,
        phoneNumber: phoneNumber,
        username: username,
        gender: document.getElementById("maleRadio").checked
          ? "Male"
          : "Female",
      };

      const response = await fetch("http://localhost:3000/api/saveProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error("Error saving user profile");
      }
      onClose();

      dispatch(setUsername(username));
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  useEffect(() => {
    const isMaleChecked = selectedGender === "Male";
    const isFemaleChecked = selectedGender === "Female";

    setIsSaveButtonDisabled(!isMaleChecked && !isFemaleChecked);
  }, [selectedGender]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      className="modal-content fixed-center relative z-50 bg-white p-5 rounded-lg shadow-lg"
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="">
          <img
            className="mx-auto h-20 w-auto"
            src="src\assets\cathotpot.jpg"
            alt="FoodCat Hotpot"
          />
        </div>
        {!userIsSignedIn ? (
          <>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign In
            </h2>
            <button
              className="flex gap-2 justify-center shadow appearance-none border rounded mt-4 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
              onClick={() => googleSignIn()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 90 92"
                fill="none"
                className="h-[18px] w-[18px]"
              >
                <path
                  d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z"
                  fill="#4280ef"
                ></path>
                <path
                  d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z"
                  fill="#34a353"
                ></path>
                <path
                  d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
                  fill="#f6b704"
                ></path>
                <path
                  d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
                  fill="#e54335"
                ></path>
              </svg>
              <span className="block text-sm font-medium text-gray-900">
                Continue with Google
              </span>
            </button>
            <div className="m:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex w-full items-center gap-2 py-4 text-sm text-gray-700">
                <div className="h-px w-full bg-gray-300"></div>or
                <div className="h-px w-full bg-gray-300"></div>
              </div>
              <div className="flex mb-3">
                <button
                  disabled
                  className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight"
                >
                  +60
                </button>
                <input
                  id="phoneNumber"
                  type="int"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  pattern="\(\d{9}\)"
                  className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
                />
              </div>
              <div className="flex mb-4">
                <input
                  id="code"
                  type="int"
                  placeholder="6-digit code"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
                />
                <button
                  className="shadow appearance-none border rounded w-2/6 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
                  onClick={() => sendOtp(phoneNumber)}
                  id="codeBtn"
                  disabled={captchaCompleted ? true : false}
                >
                  <span className="block text-sm font-medium text-gray-900">
                    {captchaCompleted ? "Meow" : "Get Code"}
                  </span>
                </button>
              </div>
              {!captchaError ? (
                <div className="mb-3.5">
                  <span className="flex text-center justify-center text-xs text-gray-400">
                    By tapping "Get Code", an SMS may be sent. Message & data
                    rates may apply.
                  </span>
                </div>
              ) : (
                <div className="flex mb-3.5 text-center justify-center text-xs text-red-400">
                  Error sending SMS.
                </div>
              )}
              {!captchaCompleted && (
                <div
                  className="flex justify-center items-center mb-3.5 rounded"
                  id="recaptcha"
                ></div>
              )}

              <div className="flex items-center justify-center">
                <button
                  className="bg-orange hover:bg-dark-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
                  id="signInBtn"
                  type="button"
                  onClick={verifyOtp}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-1">
              Complete Your Profile
            </h2>
            {signInMethod === "Google" ? (
              <div className="flex w-full my-3">
                <input
                  id="email"
                  type="email"
                  value={email}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
                  disabled
                />
              </div>
            ) : (
              <div className="flex my-3">
                <button
                  disabled
                  className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight"
                >
                  +60
                </button>
                <input
                  id="phoneNumber"
                  type="int"
                  value={phoneNumber}
                  className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
                  disabled
                />
              </div>
            )}
            <div className="sm:col-span-4">
              <fieldset className="flex mb-2.5">
                <div className="flex items-center gap-x-1">
                  <input
                    id="maleRadio"
                    name="genderRadio"
                    type="radio"
                    className=""
                    checked={selectedGender === "Male"}
                    onChange={() => setSelectedGender("Male")}
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
                    checked={selectedGender === "Female"}
                    onChange={() => setSelectedGender("Female")}
                  />
                  <label
                    htmlFor="femaleRadio"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    Ms.
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="mb-6">
              <input
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-inset focus:ring-gray-300"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-orange hover:bg-dark-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
                type="submit"
                disabled={isSaveButtonDisabled}
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FormModal;
