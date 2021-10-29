import * as types from "./auth.types";
import CallApi from "../../api/api";

export const fetchAuth = (session_id) => (dispatch) => {
  dispatch({
    type: types.FETCH_REQUEST_AUTH,
  });
  CallApi.get("/account", {
    params: {
      session_id,
    },
  })
    .then((user) => {
      dispatch(updateAuth({ user, session_id }));
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ERROR_AUTH,
        payload: error,
      });
    });
};

export const updateAuth = ({ user, session_id }) => ({
  type: "FETCH_SUCCESS_AUTH",
  payload: {
    user,
    session_id,
  },
});

export const onLogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const toggleLoginModal = () => {
  return {
    type: "TOGGLE_LOGIN_MODAL",
  };
};
