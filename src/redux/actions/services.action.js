import { fetchServices } from "../../api";
import {
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  SET_CURRENT_XML,
} from "../types/services.types";

export const fetchServicesAction = (id_category) => {
  return (dispatch) => {
    fetchServices(dispatch, id_category);
  };
};

export const fetchServicesSuccess = (services) => {
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: services,
  };
};

export const fetchServicesRequest = () => {
  return {
    type: FETCH_SERVICES_REQUEST,
  };
};

export const fetchServicesFailure = () => {
  return {
    type: FETCH_SERVICES_FAILURE,
  };
};

export const setCurrentXml = (xml) => {
  return {
    type: SET_CURRENT_XML,
    payload: xml,
  };
};
