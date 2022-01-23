import {
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  SET_CURRENT_XML,
} from "../types/services.types";

const initialState = {
  data: [],
  loading: false,
  error: false,
  xml: null,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case FETCH_SERVICES_FAILURE:
      return { ...state, error: true };
    case SET_CURRENT_XML:
      return { ...state, xml: action.payload };
    default:
      return state;
  }
};

export default servicesReducer;
