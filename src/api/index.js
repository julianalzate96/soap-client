import axios from "axios";

export const HEROKU_URL = "https://frozen-river-98217.herokuapp.com";

export const fetchServicesInfo = (type, category) => {
  const params = `type=${type}${category ? `&category=${category}` : ""}`;
  return axios
    .get(`${HEROKU_URL}/uddi.php/?${params}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const getServicesToken = (data) => {
  return axios({
    url: `${HEROKU_URL}/auth.php`,
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    });
};
