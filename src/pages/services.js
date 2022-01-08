import React, { useState, useEffect, useContext } from "react";
import soap from "soap-everywhere";

import { fetchServicesInfo } from "../api";
import ServiceContext from "../context/serviceContext";
import Modal from "../components/Modal";

export default function Services() {
  const { service } = useContext(ServiceContext);
  const [services, setServices] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const fetchCurrentCategoryServices = (service) => {
    if (service.wsdl.length > 0) {
      setBusy(true);
      soap.createClient(service.wsdl, (err, client) => {
        let response = null;
        let _services = [];

        if (err) {
          console.log("ERROR: ", err);
          setError(true);
        }

        response = client.describe();

        if (response) {
          _services = Object.keys(
            response[service.name][`${service.name}Port`]
          ).map((key) => {
            return {
              name: key,
              ...response[service.name][`${service.name}Port`][key],
            };
          });
        }

        fetchServicesInfo("services", service.id).then((res) => {
          let ser = _services.map((se) => {
            let found = res.find((s) => s.nombre === se.name);
            return { ...se, ...found };
          });

          setServices(ser);
        });
        setBusy(false);
      });
    }
  };

  const handleSelectedService = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const renderServices = () => {
    return services.map((service, i) => {
      return (
        <div key={i} onClick={() => handleSelectedService(service)}>
          <span>{service.name}</span>
          <span>{service.description}</span>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchCurrentCategoryServices(service);
  }, [service]);

  return (
    <div>
      {busy && (
        <span>Cargando los servicios de la categoria {service.name}...</span>
      )}
      {error && (
        <span>
          Error al cargar los servicios de la categoria {service.name}.
        </span>
      )}
      {renderServices()}
      {showModal && (
        <Modal
          service={selectedService}
          setShowModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
