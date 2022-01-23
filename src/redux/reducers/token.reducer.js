import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
} from "../types/token.types";

const initialState = {
  email: "",
  token: null,
  loading: false,
  error: false,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        loading: false,
        error: false,
      };
    case FETCH_TOKEN_FAILURE:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export default tokenReducer;
