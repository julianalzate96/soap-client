import React, { useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";

import Modal from "../components/Modal";
import Layout from "../components/Layout";
import ServiceCard from "../components/Card/ServiceCard";
import Loading from "../animations/loading-yellow.json";

import "../styles/index.scss";

export default function Services() {
  const {
    categories: { current: category },
    services: { loading, error, data: services },
  } = useSelector((state) => ({
    services: state.services,
    categories: state.categories,
  }));
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const handleSelectedService = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const renderServices = () => {
    if (loading) {
      return <Lottie className="loading" animationData={Loading} />;
    }

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

  return (
    <Layout>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <div className="container">
        <div className="services-container">{renderServices()}</div>
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
