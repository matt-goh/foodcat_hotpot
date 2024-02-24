import React, { useState } from "react";
import FormModal from "./FormModal";

const LoginForm = () => {
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setLoginFormOpen(true)}
        className="bg-blur bg-orange hover:bg-dark-orange text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
      >
        Sign in
      </button>

      <FormModal
        isOpen={isLoginFormOpen}
        onClose={() => setLoginFormOpen(false)}
      ></FormModal>
    </div>
  );
};

export default LoginForm;
