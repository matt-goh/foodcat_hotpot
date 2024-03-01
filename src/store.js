// store.js
import { configureStore } from '@reduxjs/toolkit';

const initialUserState = {
  username: "",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

const initialAuthState = {
  isSignedIn: false,
};

const authReducer = (state = initialAuthState, action) => {
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
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
