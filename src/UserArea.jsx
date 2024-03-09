import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUsername } from "./actions";
import { signOut } from "firebase/auth";
import FormModal from "./FormModal";
import auth from "./firebase.js";

const UserArea = () => {
  const [isSignInFormOpen, setSignInFormOpen] = useState(false);
  const [userIsSignedIn] = useAuthState(auth);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const signOutBtn = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful!");
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
      });
  };

  const getUsername = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
        }),
      });

      const user = await response.json();
      if (user) {
        dispatch(setUsername(user.username));
      } else {
        console.log("Error retrieving username from database.");
      }
    } catch (error) {
      console.error("Error retrieving username from MongoDB:", error);
    }
  };

  useEffect(() => {
    if (userIsSignedIn) {
      getUsername();
    }
  }, [userIsSignedIn]);

  return (
    <div className="flex items-center">
      {!userIsSignedIn ? (
        <button
          onClick={() => setSignInFormOpen(true)}
          className="bg-blur bg-orange hover:bg-dark-orange text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
        >
          Sign in
        </button>
      ) : (
        <Menu as="div" className="relative text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-orange px-4 py-2 text-m font-bold text-white hover:bg-dark-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              {username}
              <ChevronDownIcon
                className="flex -mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-full mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-2 py-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-orange text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                    >
                      Manage Bookings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-orange text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                      onClick={() => signOutBtn()}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}

      <FormModal
        isOpen={isSignInFormOpen}
        onClose={() => setSignInFormOpen(false)}
      ></FormModal>
    </div>
  );
};

export default UserArea;
