import { Fragment, useState } from "react";
import FormModal from "./FormModal";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const UserArea = () => {
  const isSignedIn = useSelector((state) => state.isSignedIn);
  const [isSignInFormOpen, setSignInFormOpen] = useState(false);

  return (
    <div className="flex items-center">
      {!isSignedIn ? (
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
              User
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
            <Menu.Items className="absolute right-0 top-full mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-2 py-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-orange text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
