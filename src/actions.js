// actions.js
export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username,
});

export const signInAction = () => ({
    type: 'SIGN_IN',
  });
  
export const signOutAction = () => ({
    type: 'SIGN_OUT',
  });
  