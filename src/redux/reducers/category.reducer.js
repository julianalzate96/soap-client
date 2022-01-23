import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from "../types/category.types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default categoriesReducer;
