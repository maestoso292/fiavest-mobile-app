import { AUTHENTICATE, DID_AUTO_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  expiryDate: null,
  method: null,
  didAutoLogin: false,
};

export default (state = initialState, action, expiryDate, method) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        expiryDate: expiryDate,
        method: method,
        didAutoLogin: true,
      };
    case DID_AUTO_LOGIN:
      return {
        ...state,
        didAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didAutoLogin: true}
    default:
      return state;
  }
};
