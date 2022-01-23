import axios from "axios";

import {
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "../redux/actions/categories.actions";
import {
  fetchServicesFailure,
  fetchServicesRequest,
  fetchServicesSuccess,
} from "../redux/actions/services.action";
import {
  fetchTokenFailure,
  fetchTokenRequest,
  fetchTokenSuccess,
} from "../redux/actions/token.action";

export const HEROKU_URL = "https://frozen-river-98217.herokuapp.com";

export const fetchCategories = (dispatch) => {
  dispatch(fetchCategoriesRequest());
  axios
    .get(`${HEROKU_URL}/uddi.php/?type=categories`)
    .then((response) => {
      // console.log(response.data);
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(fetchCategoriesFailure());
    });
};

export const fetchServices = (dispatch, id_category) => {
  dispatch(fetchServicesRequest());
  axios
    .get(`${HEROKU_URL}/uddi.php/?type=services&category=${id_category}`)
    .then((response) => {
      dispatch(fetchServicesSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchServicesFailure());
    });
};

export const getServicesToken = (dispatch, data, email) => {
  dispatch(fetchTokenRequest());
  axios({
    url: `${HEROKU_URL}/auth.php`,
    method: "POST",
    data,
  })
    .then((response) => {
      dispatch(fetchTokenSuccess({ email, token: response.data }));
    })
    .catch((error) => {
      dispatch(fetchTokenFailure());
    });
};
