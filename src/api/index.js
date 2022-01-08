import axios from "axios";

export const fetchServicesInfo = (type, category) => {
  const params = `type=${type}${category ? `&category=${category}` : ""}`;
  return axios
    .get(`https://frozen-river-98217.herokuapp.com/uddi.php/?${params}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
