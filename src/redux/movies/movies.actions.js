import CallApi, {API_URL, API_KEY_3} from "../../api/api";
import { batch } from "react-redux";
import { SET_MOVIES, SET_PAGINATION, SET_FILTERS, SET_SEARCH_TEXT } from "./movies.types";

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  movies,
});

export const changePagination = (page, total_pages) => ({
  type: SET_PAGINATION,
  page,
  total_pages,
});
export const changeFilters = (event) => ({
  type: SET_FILTERS,
  event
})
export const setSearchText = (text) => ({
  type: SET_SEARCH_TEXT,
  text,
})
 

export const getMovies = (filters, page) => {
  return (dispatch) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year,
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    CallApi.get("/discover/movie", {
      params: queryStringParams, 
    }).then((data) => {
      batch(() => {
        dispatch(changePagination(data.page, data.total_pages));
        dispatch(setMovies(data.results));
      })
    });
  };
};


export const searchMovies = (searchTerm, page, filters) =>{
  const {  primary_release_year } = filters || {};
  return (dispatch) => {
    fetch(`${API_URL}/search/movie?api_key=${API_KEY_3}&language=ru-RU&query=${searchTerm}&${page ? `page=${page}` : ''}&${primary_release_year ? `primary_release_year=${primary_release_year}`: ''}`)
      .then(response => response.json())
      .then(data => {
        batch(() => {
          dispatch(setSearchText(searchTerm));
          dispatch(setMovies(data.results));
          dispatch(changePagination(data.page, data.total_pages))
        })
       
    })
  } 
}
