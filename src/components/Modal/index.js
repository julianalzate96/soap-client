import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import _soap from "jquery.soap";
import XMLViewer from "react-xml-viewer";
// import parseXML from "xml-parse-from-string";

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
  const [response, setResponse] = useState({ response: null, xml: "" });

  const onSubmit = (e) => {
    e.preventDefault();

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
        setService((prev) => ({
          ...prev,
          currentXML: soapResponse.toString(),
        }));
        setResponse({
          response: soapResponse.toXML(),
          xml: soapResponse.toString(),
        });
      },
      error: function (SOAPResponse) {
        console.log("ERROR: ", SOAPResponse);
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
          <h3>{selectedService.name}</h3>
          <p>{selectedService.description}</p>
          <Form onSubmit={onSubmit}>{renderInputs()}</Form>
          {response.response && <Link to="/xml">Ver Respuesta en XML</Link>}
          <div className="xml-container">
            <p className="text">
              A continuación se muestra un ejemplo de solicitud en xml
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
              A continuación se muestra un ejemplo de respuesta en xml
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
