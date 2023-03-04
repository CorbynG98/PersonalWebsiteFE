import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../models/State';

const initialState: State = {
  username: null,
  token: null,
  isLoggedIn: false,
  activeLink: "home"
};

const auth_reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_ACTIVE_LINK':
      return {
        ...state,
        activeLink: action.data.activeLink
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
    case 'SIGN_OUT':
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null
      }
    default:
      return state;
  }
};
export default auth_reducer;
