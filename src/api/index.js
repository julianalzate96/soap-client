import axios from "axios";

export const fetchServicesInfo = (type, category) => {
  const params = `type=${type}${category ? `&category=${category}` : ""}`;
  return axios
    .get(`http://192.168.1.6:80/servicios_web/uddi.php/?${params}`)
    .then((response) => response.data)
    .then((data) => data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
