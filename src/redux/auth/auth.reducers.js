import * as types from "./auth.types";
import { cookies } from "../../utils/cookies";

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showLoginModal: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
      };
    case types.LOGOUT:
      return {
        ...state,
        session_id: null,
        user: null,
      };
    case types.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };
    default:
      return state;
  }
};

export default authReducer;
