import { SET_MOVIES, SET_PAGINATION, SET_FILTERS, SET_SEARCH_TEXT } from "./movies.types";

const initialState = {
  movies: [],
  page: 1,
  total_pages: "",
  filters: {
    sort_by: "popularity.desc",
    primary_release_year: "new Date().getFullYear()",
    with_genres: [],
  },
  searchText: '',
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    case SET_PAGINATION:
      return {
        ...state,
        page: action.page,
        total_pages: action.total_pages,
      };
    case SET_FILTERS:
      const {value, name} = action.event.target;
      return{
        ...state,
        filters: {
          ...state.filters,
          [name]: value
        }
      }
      case SET_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.text
        };
    default:
      return state;
  }
};

export default moviesReducer;
