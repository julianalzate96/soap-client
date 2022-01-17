import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";

import { fetchServicesInfo } from "../api";
import ServiceContext from "../context/serviceContext";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import ServiceCard from "../components/Card/ServiceCard";
import Loading from "../animations/loading-yellow.json";

import "../styles/index.scss";

export default function Services() {
  const { service, setService } = useContext(ServiceContext);
  const [services, setServices] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const fetchCurrentCategoryServices = (service) => {
    setBusy(true);
    fetchServicesInfo("services", service.id)
      .then((res) => {
        setServices(res);
        setBusy(false);
      })
      .catch((err) => {
        setError(err);
        setBusy(false);
      });
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
    let data = JSON.parse(localStorage.getItem("service"));
    if (data) {
      setService(data);
      fetchCurrentCategoryServices(data);
    }
  }, []);

  if (!service.id) {
    window.location.replace(window.location.origin);
  }

  return (
    <Layout>
      <h1>{service.name}</h1>
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
