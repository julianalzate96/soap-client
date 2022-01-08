import React, { useState, useContext } from "react";
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
  const { service } = useContext(serviceContext);
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
      return <input type="text" disabled />;
    }
  };
  return (
    <Layout>
      <ClickHandler action={setShowModal}>
        <div className="body">
          <h3>{selectedService.name}</h3>
          <p>{selectedService.description}</p>
          <Form onSubmit={onSubmit}>{renderInputs()}</Form>
          {response.response && (
            <XMLViewer
              xml={response.xml}
              theme={customTheme}
              collapsible
              indentSize={1}
            />
          )}
          {selectedService.xml_entradas && (
            <XMLViewer
              xml={selectedService.xml_entradas}
              theme={customTheme}
              collapsible
              indentSize={1}
            />
          )}
          {selectedService.xml_respuestas && (
            <XMLViewer
              xml={selectedService.xml_respuestas}
              theme={customTheme}
              collapsible
              indentSize={1}
            />
          )}
        </div>
      </ClickHandler>
    </Layout>
  );
}
