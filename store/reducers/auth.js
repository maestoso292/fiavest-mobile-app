import { AUTHENTICATE, DID_AUTO_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  uuid: null,
  sessionId: null,
  didAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        uuid: action.uuid,
        sessionId: action.sessionId,
        didAutoLogin: true,
        ...action.additionalData,
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
