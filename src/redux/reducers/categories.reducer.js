import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  SET_CURRENT_CATEGORY,
} from "../types/categories.types";

const initialState = {
  data: [],
  loading: false,
  error: false,
  current: {},
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
      return { ...state, error: true, loading: false };
    case SET_CURRENT_CATEGORY:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
