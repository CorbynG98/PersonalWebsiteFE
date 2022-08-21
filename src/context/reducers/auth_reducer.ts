import { AnyAction } from '@reduxjs/toolkit';
import { State } from '@src/models/State';

const initialState: State = {
  username: null,
  token: null,
  isLoggedIn: false,
};

const auth_reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isLoggedIn: true,
        username: action.data.username,
        token: action.data.token,
      };
    case 'APP_INIT':
      return {
        ...state,
        isLoggedIn: action.data.username == null ? false : true,
        username: action.data.username,
        token: action.data.token,
      };
    default:
      return state;
  }
};
export default auth_reducer;
