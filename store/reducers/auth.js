import { LOGIN } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

// Temporary reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
      
    default:
      return state;
  }
};

export default authReducer;
