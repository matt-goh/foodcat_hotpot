import React, { useState } from "react";
import FormModal from "./FormModal";

const UserArea = () => {
  const [isSignInFormOpen, setSignInFormOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setSignInFormOpen(true)}
        className="bg-blur bg-orange hover:bg-dark-orange text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
      >
        Sign in
      </button>

      <FormModal
        isOpen={isSignInFormOpen}
        onClose={() => setSignInFormOpen(false)}
      ></FormModal>
    </div>
  );
};

export default UserArea;
