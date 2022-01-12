import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import _soap from "jquery.soap";
import XMLViewer from "react-xml-viewer";

import ClickHandler from "../../hooks/clickHandler";
import Layout from "./layout";
import Form from "../Form";
import serviceContext from "../../context/serviceContext";

const customTheme = {
  overflowBreak: true,
  tagColor: "#2815B2",
};

export default function Modal({ selectedService, setShowModal }) {
  const { service, setService } = useContext(serviceContext);
  const [response, setResponse] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setBusy(true);
    let data = {};

    if (selectedService.input) {
      for (let i = 0; i < e.target.elements.length; i++) {
        if (e.target.elements[i].nodeName !== "BUTTON") {
          data = {
            ...data,
            [e.target.elements[i].name]: e.target.elements[i].value,
          };
        }
      }
    }

    _soap({
      url: service.wsdl,
      method: selectedService.name,
      headers: { "Content-Type": "application/xml" },
      data,
      success: function (soapResponse) {
        localStorage.setItem("currentXML", soapResponse.toString());
        setResponse(soapResponse);
        setBusy(false);
      },
      error: function (SOAPResponse) {
        console.log("ERROR: ", SOAPResponse);
        setError(true);
        setBusy(false);
      },
    });
  };

  const renderInputs = () => {
    if (selectedService.input) {
      return Object.keys(selectedService.input).map((input, i) => {
        return (
          <Form.Input
            key={i}
            type={selectedService.input[input].replace("xsd:", "")}
            label={input}
          />
        );
      });
    } else {
      return <span>Este servicio no requiere parametros de entrada.</span>;
    }
  };

  return (
    <Layout>
      <ClickHandler action={setShowModal}>
        <div className="body">
          <span className="close" onClick={setShowModal}>
            Cerrar
          </span>
          <h2>{selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <Form onSubmit={onSubmit} busy={busy}>
            {renderInputs()}
          </Form>
          {response && (
            <Link to="/xml" target="_blank">
              Ver Respuesta en XML
            </Link>
          )}
          {error && <span>Error al probar el servicio.</span>}
          <div className="xml-container">
            <p className="text">
              A continuación se muestra un ejemplo de solicitud en XML
            </p>
            {selectedService.xml_entradas && (
              <XMLViewer
                className="xml"
                xml={selectedService.xml_entradas}
                theme={customTheme}
                collapsible
                indentSize={1}
              />
            )}
          </div>
          <div className="xml-container">
            <p className="text">
              A continuación se muestra un ejemplo de respuesta en XML
            </p>
            {selectedService.xml_respuestas && (
              <XMLViewer
                className="xml"
                xml={selectedService.xml_respuestas}
                theme={customTheme}
                collapsible
                indentSize={1}
              />
            )}
          </div>
        </div>
      </ClickHandler>
    </Layout>
  );
}
