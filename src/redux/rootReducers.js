import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducers";
// import { cookies } from "../utils/cookies";
// import { FETCH_SUCCESS_AUTH, LOGOUT } from "./auth/auth.types";

// const updateCookies = ({ dispatch, getState }) => next => action => {
//     if (action.type === FETCH_SUCCESS_AUTH) {
//       cookies.set("session_id", action.payload.session_id, {
//         path: "/",
//         maxAge: 2592000
//       });
//     }
  
//     if (action.type === LOGOUT) {
//       cookies.remove("session_id");
//     }
  
//     return next(action);
//   };

export default combineReducers({
  auth: authReducer
});