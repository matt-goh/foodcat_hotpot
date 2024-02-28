// store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
