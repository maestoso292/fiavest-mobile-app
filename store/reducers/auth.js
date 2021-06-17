import { AUTHENTICATE, DID_AUTO_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  expiryTime: null,
  didAutoLogin: false,
};

export default (state = initialState, action, expiryTime) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        expiryTime: expiryTime,
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
