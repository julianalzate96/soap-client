import { getServicesToken } from "../../api";
import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
} from "../types/token.types";

export const fetchToken = (formData, email) => {
  return (dispatch) => {
    getServicesToken(dispatch, formData, email);
  };
};

export const fetchTokenRequest = () => {
  return {
    type: FETCH_TOKEN_REQUEST,
  };
};

export const fetchTokenSuccess = (data) => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload: data,
  };
};

export const fetchTokenFailure = () => {
  return {
    type: FETCH_TOKEN_FAILURE,
  };
};
