import React from "react";
import _soap from "jquery.soap";
import XMLViewer from "react-xml-viewer";
// import parseXML from "xml-parse-from-string";

import ClickHandler from "../../hooks/clickHandler";
import Layout from "./layout";
import Form from "../Form";

const customTheme = {
  overflowBreak: true,
};

export default function Modal({ service, setShowModal }) {
  const onSubmit = () => {
    // _soap({
    //   url: service.wsdl,
    //   method: service.name,
    //   headers: { "Content-Type": "application/xml" },
    //   data: {},
    //   success: function (soapResponse) {
    //     // setResponse(soapResponse.toXML());
    //     // setXML(soapResponse.toString());
    //   },
    //   error: function (SOAPResponse) {
    //     console.log("ERROR: ", SOAPResponse);
    //   },
    // });
  };

  const renderInputs = () => {
    if (service.input) {
      return Object.keys(service.input).map((input) => {
        return (
          <Form.Input
            type={service.input[input].replace("xsd:", "")}
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
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <Form onSubmit={onSubmit}>{renderInputs()}</Form>
          {service.xml_entradas && (
            <XMLViewer
              xml={service.xml_entradas}
              theme={customTheme}
              collapsible
              indentSize
            />
          )}
          {service.xml_respuestas && (
            <XMLViewer
              xml={service.xml_respuestas}
              theme={customTheme}
              collapsible
              indentSize
            />
          )}
        </div>
      </ClickHandler>
    </Layout>
  );
}
