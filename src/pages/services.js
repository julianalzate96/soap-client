import React, { useState, useEffect, useContext } from "react";
import soap from "soap-everywhere";
import Lottie from "lottie-react";

import { fetchServicesInfo } from "../api";
import ServiceContext from "../context/serviceContext";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import ServiceCard from "../components/Card/ServiceCard";
import Loading from "../animations/loading-yellow.json";

import "../styles/index.scss";

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
        <ServiceCard
          key={i}
          onClick={() => handleSelectedService(service)}
          service={service}
        />
      );
    });
  };

  useEffect(() => {
    fetchCurrentCategoryServices(service);
  }, [service]);

  console.log(service);

  return (
    <Layout>
      <h1>{service.name}</h1>
      <a href={service.wsdl}>{service.wsdl}</a>
      <p>{service.description}</p>
      <div className="container">
        {error && (
          <span>
            Error al cargar los servicios de la categoria {service.name}.
          </span>
        )}
        {busy && <Lottie className="loading" animationData={Loading} />}
        {!busy && !error && (
          <div className="services-container">{renderServices()}</div>
        )}
        {showModal && (
          <Modal
            selectedService={selectedService}
            setShowModal={() => setShowModal(false)}
          />
        )}
      </div>
    </Layout>
  );
}
