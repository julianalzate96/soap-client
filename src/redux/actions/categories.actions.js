import { fetchCategories } from "../../api";
import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  SET_CURRENT_CATEGORY,
} from "../types/categories.types";

export const fetchCategoriesAction = () => {
  return (dispatch) => {
    fetchCategories(dispatch);
  };
};

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

export const fetchCategoriesFailure = () => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
  };
};

export const setCurrentCategory = (currentCategory) => {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: currentCategory,
  };
};
