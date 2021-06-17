import { AUTHENTICATE, DID_AUTO_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didAutoLogin: true,
      };
    case DID_AUTO_LOGIN:
      return {
        ...state,
        didAutoLogin: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
