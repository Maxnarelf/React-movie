import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducers";
import moviesReducer from "./movies/movies.reducer";

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer
});